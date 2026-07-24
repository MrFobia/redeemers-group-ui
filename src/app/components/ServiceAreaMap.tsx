import { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, CircleMarker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { STATES, CITY_MARKERS, type StateAbbr, type LatLng } from "../data/serviceAreas";
import { KIND_META, type ContentItem } from "../data/localContent";

const B = "#1A52A8";
const SAND = "#C4AB6C";

/** Pans/zooms the map to the selected state, or to a city when one is open. */
function FlyTo({ abbr, cityPos }: { abbr: StateAbbr; cityPos?: LatLng }) {
  const map = useMap();
  useEffect(() => {
    if (cityPos) {
      map.flyTo(cityPos, 12, { duration: 0.9 });
      return;
    }
    const s = STATES.find((x) => x.abbr === abbr);
    if (s) map.flyTo(s.center, s.zoom, { duration: 0.9 });
  }, [abbr, cityPos?.[0], cityPos?.[1], map]);
  return null;
}

export function ServiceAreaMap({
  activeState,
  onSelectState,
  cityPos,
  contentPins = [],
  onPinClick,
}: {
  activeState: StateAbbr;
  onSelectState: (abbr: StateAbbr) => void;
  /** When set, the map zooms to this city instead of the whole state. */
  cityPos?: LatLng;
  /** One pin per published piece of content in the open city. */
  contentPins?: ContentItem[];
  onPinClick?: (item: ContentItem) => void;
}) {
  const anchors = CITY_MARKERS.filter((m) => m.state === activeState);
  const inCityView = !!cityPos;

  return (
    // isolation: isolate contains Leaflet's internal z-index stack (panes go up
    // to 1000, above the site's fixed header at z-100) so it can never bleed
    // above the nav/megamenu regardless of DOM order.
    <div className="relative w-full" style={{ height: 520, isolation: "isolate" }}>
      <MapContainer
        center={[35.65, -89.2]}
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", background: "#0A0B14" }}
      >
        {/* OpenStreetMap data, dark raster style from CARTO (free, no API key) so
            the basemap sits on the site's dark surface instead of fighting it. */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />

        <FlyTo abbr={activeState} cityPos={cityPos} />

        {/* State outlines only make sense at state-level zoom — their coarse
            vertex count turns into giant blocky arcs once we fly into a city,
            so we skip rendering them entirely in city view instead of just
            fading them. */}
        {!inCityView && STATES.map((s) => {
          const isActive = s.abbr === activeState;
          return (
            <Polygon
              key={s.abbr}
              positions={s.polygon}
              eventHandlers={{ click: () => onSelectState(s.abbr) }}
              pathOptions={{
                color: isActive ? SAND : "rgba(255,255,255,.35)",
                weight: isActive ? 3 : 1.5,
                fillColor: isActive ? B : "#ffffff",
                fillOpacity: isActive ? 0.35 : 0.07,
              }}
            >
              <Tooltip sticky>{s.name}</Tooltip>
            </Polygon>
          );
        })}

        {/* State-level anchor cities — hidden once we drill into one city */}
        {!inCityView && anchors.map((m) => (
          <CircleMarker
            key={m.name}
            center={m.pos}
            radius={7}
            pathOptions={{ color: "#0A0B14", weight: 2, fillColor: SAND, fillOpacity: 1 }}
          >
            <Tooltip direction="top" offset={[0, -6]} opacity={1} permanent>
              {m.name}
            </Tooltip>
          </CircleMarker>
        ))}

        {/* City-level content pins — one per published item, click opens the modal */}
        {contentPins.map((item) => {
          const accent = KIND_META[item.kind].accent;
          return (
            <CircleMarker
              key={item.id}
              center={item.pos}
              radius={9}
              eventHandlers={{ click: () => onPinClick?.(item) }}
              pathOptions={{
                color: "#0A0B14", weight: 2,
                fillColor: accent, fillOpacity: 1,
              }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                <span style={{ color: accent, fontWeight: 700 }}>{KIND_META[item.kind].label}</span>
                <br />
                {item.title}
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
