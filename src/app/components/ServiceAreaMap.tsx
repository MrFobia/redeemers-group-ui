import { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, CircleMarker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { STATES, CITY_MARKERS, type StateAbbr } from "../data/serviceAreas";

const B = "#1A52A8";
const SAND = "#C4AB6C";

/** Pans/zooms the map whenever the selected state changes. */
function FlyToState({ abbr }: { abbr: StateAbbr }) {
  const map = useMap();
  useEffect(() => {
    const s = STATES.find((x) => x.abbr === abbr);
    if (s) map.flyTo(s.center, s.zoom, { duration: 0.9 });
  }, [abbr, map]);
  return null;
}

export function ServiceAreaMap({
  activeState,
  onSelectState,
}: {
  activeState: StateAbbr;
  onSelectState: (abbr: StateAbbr) => void;
}) {
  const markers = CITY_MARKERS.filter((m) => m.state === activeState);

  return (
    <div className="relative w-full" style={{ height: 520 }}>
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

        <FlyToState abbr={activeState} />

        {STATES.map((s) => {
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

        {markers.map((m) => (
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
      </MapContainer>
    </div>
  );
}
