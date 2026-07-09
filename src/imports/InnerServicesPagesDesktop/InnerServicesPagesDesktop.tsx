import svgPaths from "./svg-mzl4iiorux";
import imgImage1 from "./f3ae97a2e77553f0244b8f37484024cfc0699697.png";
import imgPlaceholderImage from "./b7b4e314cc3eb923b7fa8aac8183d1866fe76120.png";
import imgPlaceholderImage1 from "./45013ccbfe44eb7be85fb9012a9ec4b6b1c59a5a.png";
import imgPlaceholderImage2 from "./5a31e64b7d9733fc101f77d48d0415edc659c212.png";
import imgPlaceholderImage3 from "./4bb9c4e9912ce93beab5418d5123a169c010d768.png";
import imgCard from "./d50ffb0afa333613e155822dc6b3dfe63f150a74.png";

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal items-center justify-between leading-[1.5] min-w-px relative text-[16px] text-black text-right whitespace-nowrap">
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>{`Serving Memphis, Jonesboro, Little Rock & nearby in the Tri-State Area`}</p>
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        40 Inspections booked this week
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex h-[45px] items-center justify-end pb-[5px] pt-[6px] px-[64px] relative shrink-0 w-[1440px]">
      <Frame3 />
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Chevron Down">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Chevron Down">
          <path clipRule="evenodd" d={svgPaths.pee47f00} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function NavLinkDropdown() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Nav Link Dropdown">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Services
      </p>
      <ChevronDown />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Link">
      <NavLinkDropdown />
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Link">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Problem signs
      </p>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Link">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Our difference
      </p>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Link">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Resources
      </p>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Link">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        About
      </p>
    </div>
  );
}

function NavLinks() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-end relative shrink-0" data-name="Nav links">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
      <Link4 />
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-name="Column">
      <NavLinks />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Actions">
      <div className="bg-black content-stretch flex items-center justify-center px-[20px] py-[8px] relative shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Schedule Free Inspection
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[24px] items-center py-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="h-[28.907px] relative shrink-0 w-[196px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <Column />
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Call us: 1-833-584-1049
      </p>
      <Actions />
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Column">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`Home > Services > Crawl Space Repair`}</p>
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Component">
      <Column1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Component />
    </div>
  );
}

function Header({ className }: { className?: string }) {
  return (
    <div className={className || "bg-white relative shrink-0 w-full"} data-name="Header / 47 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[8px] relative size-full">
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function TaglineWrapper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Crawl Space Repair
      </p>
    </div>
  );
}

function Column2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Column">
      <TaglineWrapper />
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[56px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Is your home showing these signs?
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-tl-[5px] rounded-tr-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            My floors are sagging or bouncy
          </p>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <div className="overflow-clip relative size-[24px]" data-name="chevron_right">
                <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                    <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#f3f3f3] relative rounded-bl-[5px] rounded-br-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>{`Lorem ipsum dolor sit amet consectetur. Blandit varius malesuada tincidunt purus. Nunc volutpat ut congue placerat iaculis bibendum vestibulum. Hac ut pellentesque fames pretium varius nibh libero. Mauris aliquam turpis amet facilisi maecenas. Urna et amet neque a aenean at curabitur dictum cursus. Amet a sit faucibus ut. Habitasse lacus amet fames sed nulla massa. `}</p>
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame1 />
      <Frame4 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Moisture or standing water
          </p>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip relative size-[24px]" data-name="chevron_right">
                <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                    <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            I smell mold or mildew
          </p>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip relative size-[24px]" data-name="chevron_right">
                <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                    <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            I smell mold or mildew
          </p>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip relative size-[24px]" data-name="chevron_right">
                <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                    <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            I smell mold or mildew
          </p>
          <div className="flex items-center justify-center relative shrink-0 size-[24px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="flex-none rotate-90">
              <div className="overflow-clip relative size-[24px]" data-name="chevron_right">
                <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                    <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame23 />
      <Frame2 />
      <Frame5 />
      <Frame24 />
      <Frame25 />
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative" data-name="Component">
      <Column2 />
      <Frame9 />
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[0px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        <span className="leading-[1.5] text-[16px]">{`Can’t see your signs? `}</span>
        <span className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.5] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          View more
        </span>
      </p>
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0" data-name="Actions">
      <div className="bg-black content-stretch flex items-center justify-center px-[24px] py-[12px] relative shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Schedule free inspection
        </p>
      </div>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        or call (901) 555-0100
      </p>
    </div>
  );
}

function Column3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Column">
      <Actions1 />
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-center min-w-px relative" data-name="Component">
      <div className="h-[359px] relative shrink-0 w-full" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage} />
      </div>
      <Column3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[48px] items-center justify-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Component1 />
      <Component2 />
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#dbdbdb] relative shrink-0 w-full" data-name="Header / 47 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[48px] relative size-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-[#a7a7a7] col-1 content-stretch flex h-[76px] items-center justify-center ml-0 mt-0 relative row-1 w-[20%]">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Crawl Space Repair
      </p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[#c9c9c9] col-1 content-stretch flex h-[76px] items-center justify-center ml-[20%] mt-0 relative row-1 w-[20%]">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Problems sings
      </p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-[#c9c9c9] col-1 content-stretch flex h-[76px] items-center justify-center ml-[40%] mt-0 relative row-1 w-[20%]">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Cost Guide
      </p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-[#c9c9c9] col-1 content-stretch flex h-[76px] items-center justify-center ml-[60%] mt-0 relative row-1 w-[20%]">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Project Gallery
      </p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="bg-[#c9c9c9] col-1 content-stretch flex h-[76px] items-center justify-center ml-[80%] mt-0 relative row-1 w-[20%]">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        FAQs
      </p>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
      <Frame26 />
      <Frame27 />
      <Frame28 />
      <Frame29 />
      <Frame30 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#c9c9c9] relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[64px] relative size-full">
        <Group1 />
      </div>
    </div>
  );
}

function TaglineWrapper1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Crawl Space Repair
      </p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[48px] text-black text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Crawl Space Solutions
      </p>
    </div>
  );
}

function SectionTitle() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center max-w-[768px] relative shrink-0 w-full" data-name="Section Title">
      <TaglineWrapper1 />
      <Content />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-black w-full" data-name="Text">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] relative shrink-0 text-[24px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Floor joist repair/replacement
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sagging floors, mold, and energy loss. SmartJack system + full encapsulation. Full process documented with photos.
      </p>
    </div>
  );
}

function ContentTop() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content Top">
      <Text />
    </div>
  );
}

function Actions2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Actions">
      <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Button">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Schedule
        </p>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
          <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
              <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <ContentTop />
      <Actions2 />
    </div>
  );
}

function Card() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Card">
      <div className="aspect-[632/346.5] relative shrink-0 w-full" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage1} />
      </div>
      <Content2 />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-black w-full" data-name="Text">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] relative shrink-0 text-[24px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Encapsulation systems
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        New home with unexpected clay soil settlement. 8 push piers installed before occupancy. Engineer report included.
      </p>
    </div>
  );
}

function ContentTop1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content Top">
      <Text1 />
    </div>
  );
}

function Actions3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Actions">
      <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Button">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Schedule
        </p>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
          <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
              <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <ContentTop1 />
      <Actions3 />
    </div>
  );
}

function Card1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Card">
      <div className="aspect-[616/616] relative shrink-0 w-full" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage1} />
      </div>
      <Content3 />
    </div>
  );
}

function Column4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[64px] items-center min-w-px relative" data-name="Column">
      <Card />
      <Card1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-black w-full" data-name="Text">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] relative shrink-0 text-[24px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Floor joist stabilization
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        New home with unexpected clay soil settlement. 8 push piers installed before occupancy. Engineer report included.
      </p>
    </div>
  );
}

function ContentTop2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content Top">
      <Text2 />
    </div>
  );
}

function Actions4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Actions">
      <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Button">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Schedule
        </p>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
          <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
              <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <ContentTop2 />
      <Actions4 />
    </div>
  );
}

function Card2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Card">
      <div className="aspect-[616/616] relative shrink-0 w-full" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage1} />
      </div>
      <Content4 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-black w-full" data-name="Text">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] relative shrink-0 text-[24px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Mold prevention
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sagging floors, mold, and energy loss. SmartJack system + full encapsulation. Full process documented with photos.
      </p>
    </div>
  );
}

function ContentTop3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content Top">
      <Text3 />
    </div>
  );
}

function Actions5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Actions">
      <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Button">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Schedule
        </p>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
          <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
              <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <ContentTop3 />
      <Actions5 />
    </div>
  );
}

function Card3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Card">
      <div className="aspect-[632/346.5] relative shrink-0 w-full" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage1} />
      </div>
      <Content5 />
    </div>
  );
}

function Column5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[64px] items-center min-w-px relative" data-name="Column">
      <Card2 />
      <Card3 />
    </div>
  );
}

function PortfolioList() {
  return (
    <div className="content-stretch flex gap-[48px] items-start justify-center relative shrink-0 w-full" data-name="Portfolio List">
      <Column4 />
      <Column5 />
    </div>
  );
}

function Actions6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Actions">
      <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          View all
        </p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-center relative shrink-0 w-full" data-name="Content">
      <PortfolioList />
      <Actions6 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <SectionTitle />
      <Content1 />
    </div>
  );
}

function Portfolio() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Portfolio / 6 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function TaglineWrapper2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Problems sings
      </p>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 text-black text-center w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[48px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        What are you noticing?
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Select a symptom to find the right solution for your home
      </p>
    </div>
  );
}

function SectionTitle1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center max-w-[768px] relative shrink-0 w-full" data-name="Section Title">
      <TaglineWrapper2 />
      <Content6 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Water in my basement
          </p>
          <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              ​
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
              <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                  <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Damp or wet walls
          </p>
          <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              ​
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
              <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                  <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Condensation on pipes
          </p>
          <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              ​
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
              <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                  <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Puddles after rain
          </p>
          <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              ​
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
              <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                  <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Efflorescence (white stains)
          </p>
          <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              ​
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
              <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                  <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[40px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`Moisture & Water`}</p>
      <Frame7 />
      <Frame8 />
      <Frame10 />
      <Frame11 />
      <Frame12 />
    </div>
  );
}

function ContentTop4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content Top">
      <Content8 />
    </div>
  );
}

function Content7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[48px] relative size-full">
          <ContentTop4 />
        </div>
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Content7 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Sagging or bouncy floors
          </p>
          <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              ​
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
              <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                  <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Cracks in walls or floor
          </p>
          <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              ​
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
              <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                  <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            My floors are sagging or bouncy
          </p>
          <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              ​
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
              <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                  <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            My floors are sagging or bouncy
          </p>
          <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              ​
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
              <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                  <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            My floors are sagging or bouncy
          </p>
          <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              ​
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
              <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                  <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[40px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`Structural & Foundation`}</p>
      <Frame13 />
      <Frame14 />
      <Frame15 />
      <Frame16 />
      <Frame17 />
    </div>
  );
}

function ContentTop5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content Top">
      <Content10 />
    </div>
  );
}

function Content9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[48px] relative size-full">
          <ContentTop5 />
        </div>
      </div>
    </div>
  );
}

function Card5() {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Content9 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Musty or earthy smell
          </p>
          <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              ​
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
              <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                  <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Allergy or asthma flare-ups
          </p>
          <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              ​
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
              <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                  <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            My floors are sagging or bouncy
          </p>
          <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              ​
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
              <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                  <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            My floors are sagging or bouncy
          </p>
          <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              ​
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
              <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                  <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-[#f3f3f3] h-[28px] relative rounded-[5px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            My floors are sagging or bouncy
          </p>
          <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
            <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              ​
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
              <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
                  <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[40px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`Air Quality & Smell`}</p>
      <Frame18 />
      <Frame19 />
      <Frame20 />
      <Frame21 />
      <Frame22 />
    </div>
  );
}

function ContentTop6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content Top">
      <Content12 />
    </div>
  );
}

function Content11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[48px] relative size-full">
          <ContentTop6 />
        </div>
      </div>
    </div>
  );
}

function Card6() {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Content11 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Column6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[32px] items-start min-w-px relative" data-name="Column">
      <Card4 />
      <Card5 />
      <Card6 />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Row">
      <Column6 />
    </div>
  );
}

function Component3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Component">
      <Row />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <SectionTitle1 />
      <Component3 />
    </div>
  );
}

function Layout() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Layout / 380 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function TaglineWrapper3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Cost Guide
      </p>
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-black w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[40px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        How much does crawl space repair cost?
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`Typical range: $3,000 – $15,000 depending on size and damage level. We'll give you an exact number after your free inspection.`}</p>
    </div>
  );
}

function ContentTop7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content Top">
      <TaglineWrapper3 />
      <Content14 />
    </div>
  );
}

function Actions7() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Actions">
      <div className="relative shrink-0" data-name="Button">
        <div className="content-stretch flex items-center justify-center overflow-clip px-[24px] py-[12px] relative rounded-[inherit] size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            See full cost guide
          </p>
        </div>
        <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Financing options
        </p>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
          <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
              <path d={svgPaths.p36daa800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content13() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-start justify-center p-[48px] relative size-full">
          <ContentTop7 />
          <Actions7 />
        </div>
      </div>
    </div>
  );
}

function Card7() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative w-full" data-name="Card">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <Content13 />
        <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Placeholder Image">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage2} />
        </div>
        <p className="absolute font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] left-[856px] text-[16px] text-black top-[309.77px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Cost breakdown chart / table
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Component4() {
  return (
    <div className="content-stretch flex flex-col h-[499px] items-center relative shrink-0 w-full" data-name="Component">
      <Card7 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Component4 />
    </div>
  );
}

function Layout1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Layout / 408 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function SectionTitle2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[768px] relative shrink-0 text-black text-center w-full" data-name="Section Title">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[48px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Project Gallery
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`See what we've built and repaired`}</p>
    </div>
  );
}

function Content16() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Content">
      <div className="relative shrink-0 size-[405.3px]" data-name="Placeholder Image 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage3} />
      </div>
      <div className="relative shrink-0 size-[405.3px]" data-name="Placeholder Image 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage3} />
      </div>
      <div className="relative shrink-0 size-[405.3px]" data-name="Placeholder Image 3">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage3} />
      </div>
      <div className="relative shrink-0 size-[405.3px]" data-name="Placeholder Image 4">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage3} />
      </div>
      <div className="relative shrink-0 size-[405.3px]" data-name="Placeholder Image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage3} />
      </div>
      <div className="relative shrink-0 size-[405.3px]" data-name="Placeholder Image 6">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage3} />
      </div>
    </div>
  );
}

function Content17() {
  return (
    <div className="absolute h-[416px] right-0 top-0 w-px" data-name="Content">
      <div className="-translate-y-1/2 absolute bg-white content-stretch flex items-center justify-center p-[12px] right-[-28px] rounded-[50px] top-1/2" data-name="Slider Arrow">
        <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[50px]" />
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="arrow_forward">
          <div className="absolute inset-[17.46%_17.44%_17.44%_16.04%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.963 15.624">
              <path d={svgPaths.pbdcaff0} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content18() {
  return (
    <div className="absolute h-[416px] left-0 top-0 w-px" data-name="Content">
      <div className="-translate-y-1/2 absolute bg-white content-stretch flex items-center justify-center left-[-28px] p-[12px] rounded-[50px] top-1/2" data-name="Slider Arrow">
        <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[50px]" />
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="arrow_back">
          <div className="absolute inset-[17.44%_16.02%_17.46%_17.44%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.969 15.624">
              <path d={svgPaths.p6bb9380} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderDots() {
  return (
    <div className="relative shrink-0 w-full" data-name="Slider Dots">
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex gap-[9px] items-start justify-center p-[10px] relative size-full">
          <div className="relative shrink-0 size-[8px]" data-name="Dot">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
              <circle cx="4" cy="4" fill="var(--fill-0, black)" id="Dot" r="4" />
            </svg>
          </div>
          <div className="relative shrink-0 size-[8px]" data-name="Dot">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
              <circle cx="4" cy="4" fill="var(--fill-0, black)" id="Dot" opacity="0.2" r="4" />
            </svg>
          </div>
          <div className="relative shrink-0 size-[8px]" data-name="Dot">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
              <circle cx="4" cy="4" fill="var(--fill-0, black)" id="Dot" opacity="0.2" r="4" />
            </svg>
          </div>
          <div className="relative shrink-0 size-[8px]" data-name="Dot">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
              <circle cx="4" cy="4" fill="var(--fill-0, black)" id="Dot" opacity="0.2" r="4" />
            </svg>
          </div>
          <div className="relative shrink-0 size-[8px]" data-name="Dot">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
              <circle cx="4" cy="4" fill="var(--fill-0, black)" id="Dot" opacity="0.2" r="4" />
            </svg>
          </div>
          <div className="relative shrink-0 size-[8px]" data-name="Dot">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
              <circle cx="4" cy="4" fill="var(--fill-0, black)" id="Dot" opacity="0.2" r="4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content15() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full" data-name="Content">
      <Content16 />
      <Content17 />
      <Content18 />
      <SliderDots />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <SectionTitle2 />
      <Content15 />
    </div>
  );
}

function Gallery() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Gallery / 18 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function SectionTitle3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[768px] relative shrink-0 text-black text-center w-full" data-name="Section Title">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[48px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Frequently asked questions
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Find answers about our services and process
      </p>
    </div>
  );
}

function Question() {
  return (
    <div className="relative shrink-0 w-full" data-name="Question">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[24px] items-center px-[24px] py-[20px] relative size-full">
          <p className="flex-[1_0_0] font-['Roboto:Bold',sans-serif] font-bold leading-[1.5] min-w-px relative text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
            How long does crawl space repair take?
          </p>
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="close">
            <div className="absolute inset-[22.6%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.15 13.15">
                <path d={svgPaths.p23282800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Answer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Answer">
      <div className="content-stretch flex items-start pb-[24px] px-[24px] relative size-full">
        <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>{`Most repairs take 1–2 days. Encapsulation on larger spaces may take 2–3 days. We'll give you a specific timeline during your inspection.`}</p>
      </div>
    </div>
  );
}

function Accordion() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Accordion">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
      <Question />
      <Answer />
    </div>
  );
}

function Question1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Question">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[24px] items-center px-[24px] py-[20px] relative size-full">
          <p className="flex-[1_0_0] font-['Roboto:Bold',sans-serif] font-bold leading-[1.5] min-w-px relative text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
            Do you offer financing?
          </p>
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="close">
            <div className="absolute inset-[22.6%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.15 13.15">
                <path d={svgPaths.p23282800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Answer1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Answer">
      <div className="content-stretch flex items-start pb-[24px] px-[24px] relative size-full">
        <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
          Yes. We work with trusted lenders to make repairs affordable. Flexible terms and competitive rates are available for qualified homeowners. Ask about options during your free inspection.
        </p>
      </div>
    </div>
  );
}

function Accordion1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Accordion">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
      <Question1 />
      <Answer1 />
    </div>
  );
}

function Question2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Question">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[24px] items-center px-[24px] py-[20px] relative size-full">
          <p className="flex-[1_0_0] font-['Roboto:Bold',sans-serif] font-bold leading-[1.5] min-w-px relative text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
            What areas do you serve?
          </p>
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="close">
            <div className="absolute inset-[22.6%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.15 13.15">
                <path d={svgPaths.p23282800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Answer2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Answer">
      <div className="content-stretch flex items-start pb-[24px] px-[24px] relative size-full">
        <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>{`We serve multiple regions across the country. Check our service areas page to see if we're in your location. If you're on the edge of our territory, contact us anyway. We may be able to help.`}</p>
      </div>
    </div>
  );
}

function Accordion2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Accordion">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
      <Question2 />
      <Answer2 />
    </div>
  );
}

function Question3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Question">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[24px] items-center px-[24px] py-[20px] relative size-full">
          <p className="flex-[1_0_0] font-['Roboto:Bold',sans-serif] font-bold leading-[1.5] min-w-px relative text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
            Are your installers certified?
          </p>
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="close">
            <div className="absolute inset-[22.6%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.15 13.15">
                <path d={svgPaths.p23282800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Answer3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Answer">
      <div className="content-stretch flex items-start pb-[24px] px-[24px] relative size-full">
        <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
          Every installer is certified and trained in our methods. We stand behind their work with comprehensive warranties. Your home is in capable hands.
        </p>
      </div>
    </div>
  );
}

function Accordion3() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Accordion">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
      <Question3 />
      <Answer3 />
    </div>
  );
}

function Question4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Question">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[24px] items-center px-[24px] py-[20px] relative size-full">
          <p className="flex-[1_0_0] font-['Roboto:Bold',sans-serif] font-bold leading-[1.5] min-w-px relative text-[18px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
            What if I need emergency service?
          </p>
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="close">
            <div className="absolute inset-[22.6%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.15 13.15">
                <path d={svgPaths.p23282800} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Answer4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Answer">
      <div className="content-stretch flex items-start pb-[24px] px-[24px] relative size-full">
        <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
          Call us immediately if you have water intrusion or structural concerns. We prioritize urgent situations and respond quickly. Your safety matters most.
        </p>
      </div>
    </div>
  );
}

function Accordion4() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Accordion">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
      <Question4 />
      <Answer4 />
    </div>
  );
}

function AccordionList() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[768px] relative shrink-0 w-full" data-name="Accordion List">
      <Accordion />
      <Accordion1 />
      <Accordion2 />
      <Accordion3 />
      <Accordion4 />
    </div>
  );
}

function Content20() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 text-black text-center w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.3] relative shrink-0 text-[32px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Still have questions?
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Reach out to our team anytime
      </p>
    </div>
  );
}

function Actions8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Actions">
      <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Contact
        </p>
      </div>
    </div>
  );
}

function Content19() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[560px] relative shrink-0 w-full" data-name="Content">
      <Content20 />
      <Actions8 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <SectionTitle3 />
      <AccordionList />
      <Content19 />
    </div>
  );
}

function Faq() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="FAQ / 4 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function Content22() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 text-center text-white w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[48px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Ready to fix your crawl space?
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Free inspection · Same-week availability · Lifetime warranty
      </p>
    </div>
  );
}

function Actions9() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Actions">
      <div className="bg-white content-stretch flex items-center justify-center px-[24px] py-[12px] relative shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none" />
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Schedule free inspection
        </p>
      </div>
      <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none" />
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          or call (901) 555-0100v
        </p>
      </div>
    </div>
  );
}

function Content21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-center max-w-[768px] min-w-px relative" data-name="Content">
      <Content22 />
      <Actions9 />
    </div>
  );
}

function Card8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgCard} />
        <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0" />
      </div>
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center p-[64px] relative size-full">
          <Content21 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Card8 />
    </div>
  );
}

function Cta() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip px-[64px] py-[112px] relative shrink-0 w-[1440px]" data-name="CTA / 53 /">
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="h-[24px] relative shrink-0 w-[163px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
    </div>
  );
}

function Column7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Column">
      <div className="bg-white content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 w-full" data-name="Navbar / 1 /">
        <Container10 />
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Crawl space
      </p>
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Waterproofing vs basement
      </p>
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>{`Foundation `}</p>
    </div>
  );
}

function Link8() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>{`Concrete `}</p>
    </div>
  );
}

function Link9() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Commercial
      </p>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Footer Links">
      <Link5 />
      <Link6 />
      <Link7 />
      <Link8 />
      <Link9 />
    </div>
  );
}

function Column8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip relative" data-name="Column">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Services
      </p>
      <FooterLinks />
    </div>
  );
}

function Link10() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        About us
      </p>
    </div>
  );
}

function Link11() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Our work
      </p>
    </div>
  );
}

function Link12() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Blog
      </p>
    </div>
  );
}

function Link13() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Careers
      </p>
    </div>
  );
}

function Link14() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Financing
      </p>
    </div>
  );
}

function FooterLinks1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Footer Links">
      <Link10 />
      <Link11 />
      <Link12 />
      <Link13 />
      <Link14 />
    </div>
  );
}

function Column9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip relative" data-name="Column">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Company
      </p>
      <FooterLinks1 />
    </div>
  );
}

function Link15() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Tennessee
      </p>
    </div>
  );
}

function Link16() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Missouri
      </p>
    </div>
  );
}

function Link17() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Arkansas
      </p>
    </div>
  );
}

function Link18() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Mississippi
      </p>
    </div>
  );
}

function FooterLinks2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Footer Links">
      <Link15 />
      <Link16 />
      <Link17 />
      <Link18 />
    </div>
  );
}

function Column10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip relative" data-name="Column">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Locations
      </p>
      <FooterLinks2 />
    </div>
  );
}

function Link19() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Why work with us
      </p>
    </div>
  );
}

function Link20() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Job positions
      </p>
    </div>
  );
}

function Link21() {
  return (
    <div className="content-stretch flex items-start opacity-0 py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Chattanooga, TN
      </p>
    </div>
  );
}

function FooterLinks3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Footer Links">
      <Link19 />
      <Link20 />
      <Link21 />
    </div>
  );
}

function Column11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip relative" data-name="Column">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Careers
      </p>
      <FooterLinks3 />
    </div>
  );
}

function Link22() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        (901) 555-0100
      </p>
    </div>
  );
}

function Link23() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        info@redeemersgroup.com
      </p>
    </div>
  );
}

function Link24() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Schedule inspection
      </p>
    </div>
  );
}

function Link25() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Customer portal
      </p>
    </div>
  );
}

function FooterLinks4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Footer Links">
      <Link22 />
      <Link23 />
      <Link24 />
      <Link25 />
    </div>
  );
}

function Column12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip relative" data-name="Column">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Contact
      </p>
      <FooterLinks4 />
    </div>
  );
}

function Links() {
  return (
    <div className="content-stretch flex gap-[40px] items-start relative shrink-0 w-full" data-name="Links">
      <Column7 />
      <Column8 />
      <Column9 />
      <Column10 />
      <Column11 />
      <Column12 />
    </div>
  );
}

function Credits1() {
  return (
    <div className="content-stretch flex font-['Roboto:Regular',sans-serif] font-normal gap-[24px] items-center leading-[1.5] relative shrink-0 text-[14px] text-black whitespace-nowrap" data-name="Credits">
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        © 2026 Redeemers Group. All rights reserved.
      </p>
      <p className="[text-decoration-skip-ink:none] decoration-solid relative shrink-0 underline" style={{ fontVariationSettings: "'wdth' 100" }}>
        Privacy policy
      </p>
      <p className="[text-decoration-skip-ink:none] decoration-solid relative shrink-0 underline" style={{ fontVariationSettings: "'wdth' 100" }}>
        Terms of service
      </p>
      <p className="[text-decoration-skip-ink:none] decoration-solid relative shrink-0 underline" style={{ fontVariationSettings: "'wdth' 100" }}>
        Cookies settings
      </p>
    </div>
  );
}

function Group() {
  return (
    <div className="relative size-[24px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group 1">
          <path d={svgPaths.p6da2a00} fill="var(--fill-0, #0E0F11)" id="path62" />
          <path d={svgPaths.p1f747400} fill="var(--fill-0, white)" id="path64" />
        </g>
      </svg>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Social Links">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <Group />
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Facebook">
        <div className="absolute inset-[9.34%_8.33%_7.32%_8.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p2c56c980} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Instagram">
        <div className="absolute inset-[13.51%_12.5%_11.49%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p9b0b480} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="X">
        <div className="absolute inset-[17.68%_12.5%_15.66%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16">
            <path d={svgPaths.pd265900} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="LinkedIn">
        <div className="absolute inset-[13.51%_12.5%_11.49%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p56afe80} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Youtube">
        <div className="absolute inset-[20.83%_8.33%_20.78%_8.27%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0141 14.012">
            <path d={svgPaths.p1fcc3d80} fill="var(--fill-0, black)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Row">
      <Credits1 />
      <SocialLinks />
    </div>
  );
}

function Credits() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Credits">
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1280 1">
            <line id="Divider" stroke="var(--stroke-0, black)" x2="1280" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Row1 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Links />
      <Credits />
    </div>
  );
}

export default function InnerServicesPagesDesktop() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Inner services pages • Desktop">
      <div className="bg-white relative shrink-0 w-full" data-name="Header">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center px-[64px] relative size-full">
            <Frame />
            <Container />
          </div>
        </div>
      </div>
      <Header />
      <Header1 />
      <Frame6 />
      <Portfolio />
      <Layout />
      <Layout1 />
      <Gallery />
      <Faq />
      <Cta />
      <div className="bg-white relative shrink-0 w-full" data-name="Footer">
        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center px-[64px] py-[80px] relative size-full">
            <Container9 />
          </div>
        </div>
      </div>
    </div>
  );
}