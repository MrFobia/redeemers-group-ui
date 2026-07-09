import svgPaths from "./svg-gbs5v6gi0c";
import imgImage1 from "./f3ae97a2e77553f0244b8f37484024cfc0699697.png";
import imgHeader111 from "./d50ffb0afa333613e155822dc6b3dfe63f150a74.png";
import imgPlaceholderImage from "./2685dd01025a359455692b2635e1a3dff9349f22.png";
import imgPlaceholderImage1 from "./b7b4e314cc3eb923b7fa8aac8183d1866fe76120.png";
import imgPlaceholderLightbox from "./cfe4ab08e161479b0e2b3e9e722b2e44aa563e96.png";
import imgAvatarImage from "./adc222f041c760eddb8554a498caaa6e8aa2fc75.png";
import imgPlaceholderImage2 from "./a9ec055278adddb4f5b45a7513a71e1c3fe77429.png";
import imgPlaceholderImage3 from "./d568b164c26b35eebe6a407c03f478bc8049c84b.png";

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal items-center justify-between leading-[1.5] min-w-px relative text-[16px] text-black text-right whitespace-nowrap">
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>{`Serving Tennessee, Arkansas, Mississippi & Missouri`}</p>
      <p className="relative shrink-0" style={{ fontVariationSettings: "'wdth' 100" }}>
        40 Inspections booked this week
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex h-[45px] items-center justify-end pb-[5px] pt-[6px] px-[64px] relative shrink-0 w-[1440px]">
      <Frame5 />
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

function Header({ className }: { className?: string }) {
  return (
    <div className={className || "bg-white relative shrink-0 w-full"} data-name="Header">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[64px] relative size-full">
          <Frame1 />
          <Container />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[16px] relative shrink-0 w-full">
      <div className="font-['Roboto:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[56px] text-white w-[600px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.2] mb-0">Protecting Homes,</p>
        <p className="leading-[1.2]">One Foundation at a Time.</p>
      </div>
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Actions">
      <div className="bg-white content-stretch flex items-center justify-center px-[24px] py-[12px] relative shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none" />
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Schedule Free Inspection
        </p>
      </div>
      <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none" />
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          or call (901) 555-0100
        </p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex h-[28px] items-center justify-center p-[4px] relative rounded-[5px] shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Financing from $79/month · 0% for qualified homeowners
      </p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start justify-end relative shrink-0 w-full" data-name="Content">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[18px] text-white w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Crawl space, basement waterproofing, foundation repair and concrete leveling — backed by a lifetime warranty.
      </p>
      <Actions1 />
      <Frame2 />
    </div>
  );
}

function ColumnOne() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative self-stretch shrink-0 w-[600px]" data-name="Column one">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[28px] text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Tennessee · Mississippi · Arkansas
      </p>
      <Frame />
      <Content />
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex h-[445px] items-start relative shrink-0 w-full" data-name="Component">
      <ColumnOne />
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

function Stat() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[94px] items-center justify-center p-[32px] relative shrink-0 w-[160px]" data-name="Stat">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none" />
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[30px] text-center text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        12,250
      </p>
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] relative shrink-0 text-[14px] text-center text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        homes served
      </p>
    </div>
  );
}

function Stat1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[94px] items-center justify-center p-[32px] relative shrink-0 w-[160px]" data-name="Stat">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none" />
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[30px] text-center text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        4.9
      </p>
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] relative shrink-0 text-[14px] text-center text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Google reviews
      </p>
    </div>
  );
}

function Stat2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[94px] items-center justify-center p-[32px] relative shrink-0 w-[160px]" data-name="Stat">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none" />
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[30px] text-center text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        A+
      </p>
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] relative shrink-0 text-[14px] text-center text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        BBB Rating
      </p>
    </div>
  );
}

function Stat3() {
  return (
    <div className="content-stretch flex flex-col h-[94px] items-center justify-center p-[32px] relative shrink-0 w-[160px]" data-name="Stat">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none" />
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[0.8] relative shrink-0 text-[30px] text-center text-white w-[140px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Lifetime guarantee
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[689px] top-[650px]">
      <Stat />
      <Stat1 />
      <Stat2 />
      <Stat3 />
    </div>
  );
}

function Header1() {
  return (
    <div className="h-[786px] relative shrink-0 w-full" data-name="Header / 111 /">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgHeader111} />
        <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0" />
      </div>
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[80px] items-start justify-center px-[64px] py-[112px] relative size-full">
          <Container1 />
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function TaglineWrapper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        What are you dealing with?
      </p>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 text-black text-center w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[48px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        What we repair and restore
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Structural problems need real solutions, not temporary fixes.
      </p>
    </div>
  );
}

function SectionTitle() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center max-w-[768px] relative shrink-0 w-full" data-name="Section Title">
      <TaglineWrapper />
      <Content1 />
    </div>
  );
}

function TaglineWrapper1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Crawl space
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex h-[28px] items-center justify-center p-[4px] relative rounded-[5px] shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Service 1
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex h-[28px] items-center justify-center p-[4px] relative rounded-[5px] shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Service 2
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex h-[28px] items-center justify-center p-[4px] relative rounded-[5px] shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Service 3
      </p>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] min-w-full relative shrink-0 text-[24px] text-black w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        My floors are sagging
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[16px] text-black w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        We handle encapsulation, structural repair, and moisture control.
      </p>
      <Frame6 />
      <Frame7 />
      <Frame8 />
    </div>
  );
}

function ContentTop() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content Top">
      <TaglineWrapper1 />
      <Content3 />
    </div>
  );
}

function Actions2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Actions">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Explore
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
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] relative size-full">
          <ContentTop />
          <Actions2 />
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white relative self-stretch shrink-0 w-[640px]" data-name="Card">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Placeholder Image">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage} />
        </div>
        <Content2 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function TaglineWrapper2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Foundation Repair
      </p>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-black w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] relative shrink-0 text-[24px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        I see wall cracks
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Lorem ipsum dolor sit amet consectetur. Libero habitant pellentesque luctus semper non.
      </p>
    </div>
  );
}

function ContentTop1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content Top">
      <TaglineWrapper2 />
      <Content5 />
    </div>
  );
}

function Actions3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Actions">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Explore
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
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] relative size-full">
          <ContentTop1 />
          <Actions3 />
        </div>
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white flex-[1_0_0] h-[423px] min-w-px relative" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="h-[171px] relative shrink-0 w-full" data-name="Placeholder Image">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage1} />
        </div>
        <Content4 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function TaglineWrapper3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Waterproofing
      </p>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-black w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] relative shrink-0 text-[24px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        My basement is wet
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal h-[81px] leading-[1.5] relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Interior drainage and membranes keep water where it belongs.
      </p>
    </div>
  );
}

function ContentTop2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content Top">
      <TaglineWrapper3 />
      <Content7 />
    </div>
  );
}

function Actions4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Actions">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Explore
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

function Content6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] relative size-full">
          <ContentTop2 />
          <Actions4 />
        </div>
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="h-[171px] relative shrink-0 w-full" data-name="Placeholder Image">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage1} />
        </div>
        <Content6 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Row">
      <Card />
      <Card1 />
      <Card2 />
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1280px]" data-name="Component">
      <Row />
    </div>
  );
}

function TaglineWrapper4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Concrete Services
      </p>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-black w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] relative shrink-0 text-[24px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Uneven concrete / driveway
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Interior drainage and membranes keep water where it belongs.
      </p>
    </div>
  );
}

function ContentTop3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content Top">
      <TaglineWrapper4 />
      <Content9 />
    </div>
  );
}

function Actions5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Actions">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Explore
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

function Content8() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] relative size-full">
          <ContentTop3 />
          <Actions5 />
        </div>
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-white h-[194px] relative shrink-0 w-[1280px]" data-name="Card">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Placeholder Image">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage1} />
        </div>
        <Content8 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function TaglineWrapper5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Mold prevention
      </p>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-black w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] relative shrink-0 text-[24px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        I smell something musty
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Mold hides before you can see it. We find the moisture source and treat it before it spreads through your home.
      </p>
    </div>
  );
}

function ContentTop4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content Top">
      <TaglineWrapper5 />
      <Content11 />
    </div>
  );
}

function Actions6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Actions">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Explore
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

function Content10() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] relative size-full">
          <ContentTop4 />
          <Actions6 />
        </div>
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-white flex-[1_0_0] h-[423px] min-w-px relative" data-name="Card">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Placeholder Image">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage} />
        </div>
        <Content10 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function TaglineWrapper6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Insulation
      </p>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-black w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] relative shrink-0 text-[24px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        My home is always too hot or cold
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Poor insulation forces your HVAC to work overtime. We seal the gaps so you stay comfortable and cut energy bills.
      </p>
    </div>
  );
}

function ContentTop5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content Top">
      <TaglineWrapper6 />
      <Content13 />
    </div>
  );
}

function Actions7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Actions">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Explore
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

function Content12() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] relative size-full">
          <ContentTop5 />
          <Actions7 />
        </div>
      </div>
    </div>
  );
}

function Card5() {
  return (
    <div className="bg-white flex-[1_0_0] h-[423px] min-w-px relative" data-name="Card">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <Content12 />
        <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Placeholder Image">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage} />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Row">
      <Card4 />
      <Card5 />
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1280px]" data-name="Component">
      <Row1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0">
      <Component1 />
      <Card3 />
      <Component2 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <SectionTitle />
      <Frame4 />
    </div>
  );
}

function Layout2() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Layout / 370 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function TaglineWrapper7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Why
      </p>
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-black w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[48px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Why Redeemers Group?
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Family-owned since 2008. Every installer certified. Every job backed by our lifetime transferable warranty.
      </p>
    </div>
  );
}

function SectionTitle1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Section Title">
      <TaglineWrapper7 />
      <Content14 />
    </div>
  );
}

function Actions8() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Actions">
      <div className="relative shrink-0" data-name="Button">
        <div className="content-stretch flex items-center justify-center overflow-clip px-[24px] py-[12px] relative rounded-[inherit] size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Meet the team
          </p>
        </div>
        <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="content-stretch flex gap-[8px] items-center justify-center opacity-0 overflow-clip relative shrink-0" data-name="Button">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          About us
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

function ContentLeft() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px relative" data-name="Content Left">
      <SectionTitle1 />
      <Actions8 />
    </div>
  );
}

function Stat4() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-center justify-center p-[32px] relative shrink-0 w-[298px]" data-name="Stat">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[50px] text-black text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        12,000+
      </p>
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] relative shrink-0 text-[20px] text-black text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Satisfied customers
      </p>
    </div>
  );
}

function Stat5() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-center justify-center p-[32px] relative shrink-0 w-[298px]" data-name="Stat">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[50px] text-black text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        16 yrs
      </p>
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] relative shrink-0 text-[20px] text-black text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        In business
      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[80px] items-center relative shrink-0">
      <Stat4 />
      <Stat5 />
    </div>
  );
}

function Stat6() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-center justify-center p-[32px] relative shrink-0 w-[298px]" data-name="Stat">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
      <p className="font-['Roboto:Bold','Noto_Sans:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[50px] text-black text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        4.9★
      </p>
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] relative shrink-0 text-[20px] text-black text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Google Reviews
      </p>
    </div>
  );
}

function Stat7() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[160px] items-center justify-center p-[32px] relative shrink-0 w-[298px]" data-name="Stat">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
      <div className="font-['Roboto:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] text-black text-center w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[1.4] mb-0">Lifetime</p>
        <p className="leading-[1.4]">Transferable warranty</p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[80px] items-center relative shrink-0">
      <Stat6 />
      <Stat7 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start justify-center relative shrink-0">
      <Frame10 />
      <Frame11 />
    </div>
  );
}

function Component3() {
  return (
    <div className="content-stretch flex gap-[80px] items-center relative shrink-0 w-full" data-name="Component">
      <ContentLeft />
      <Frame9 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Component3 />
    </div>
  );
}

function Layout() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Layout / 1 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function TaglineWrapper8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Reviews
      </p>
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip relative" data-name="Column">
      <TaglineWrapper8 />
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[48px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        What our customers say about us
      </p>
    </div>
  );
}

function Actions9() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Actions">
      <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Schedule a free inspection
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Button">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Read all reviews
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

function Column2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px relative" data-name="Column">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[18px] text-black w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Homeowners trust Redeemers because we deliver results. Our track record speaks for itself, and our customers keep coming back.
      </p>
      <Actions9 />
    </div>
  );
}

function Content15() {
  return (
    <div className="content-stretch flex gap-[80px] items-start relative shrink-0 w-full" data-name="Content">
      <Column1 />
      <Column2 />
    </div>
  );
}

function PlayButton() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[64px] top-[calc(50%+0.5px)]" data-name="Play Button">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="Play Button">
          <path clipRule="evenodd" d={svgPaths.p7ef280} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function PlaceholderLightbox() {
  return (
    <div className="h-[203px] overflow-clip relative shrink-0 w-[352px]" data-name="Placeholder Lightbox">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgPlaceholderLightbox} />
        <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0" />
      </div>
      <PlayButton />
    </div>
  );
}

function Stars() {
  return (
    <div className="h-[18.889px] relative shrink-0 w-[116px]" data-name="Stars">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116 18.8889">
        <g clipPath="url(#clip0_1_713)" id="Stars">
          <path d={svgPaths.p23629f00} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p84d7480} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p24418170} fill="var(--fill-0, black)" id="Vector_3" />
          <path d={svgPaths.p28ff5800} fill="var(--fill-0, black)" id="Vector_4" />
          <path d={svgPaths.p32177b30} fill="var(--fill-0, black)" id="Vector_5" />
        </g>
        <defs>
          <clipPath id="clip0_1_713">
            <rect fill="white" height="18.8889" width="116" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Content17() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-name="Content">
      <PlaceholderLightbox />
      <Stars />
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] text-black w-[352px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Joe was very thorough with explaining everything and even came back a second time to explain and clarify. I called 3 or 4 other companies, while they did quote cheaper prices, I wasn't convinced their solutions were a long time solution and I wasn't sure if they all had warranties.`}</p>
    </div>
  );
}

function AvatarContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.5] min-w-px relative text-[16px] text-black" data-name="Avatar Content">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Victoria E.
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Memphis, TN
      </p>
    </div>
  );
}

function Avatar() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Avatar">
      <div className="relative shrink-0 size-[48px]" data-name="Avatar Image">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="48" src={imgAvatarImage} width="48" />
      </div>
      <AvatarContent />
    </div>
  );
}

function Column3() {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative" data-name="Column">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[32px] relative size-full">
          <Content17 />
          <Avatar />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PlayButton1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[64px] top-[calc(50%+0.5px)]" data-name="Play Button">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="Play Button">
          <path clipRule="evenodd" d={svgPaths.p7ef280} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function PlaceholderLightbox1() {
  return (
    <div className="h-[203px] overflow-clip relative shrink-0 w-[352px]" data-name="Placeholder Lightbox">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgPlaceholderLightbox} />
        <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0" />
      </div>
      <PlayButton1 />
    </div>
  );
}

function Stars1() {
  return (
    <div className="h-[18.889px] relative shrink-0 w-[116px]" data-name="Stars">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116 18.8889">
        <g clipPath="url(#clip0_1_713)" id="Stars">
          <path d={svgPaths.p23629f00} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p84d7480} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p24418170} fill="var(--fill-0, black)" id="Vector_3" />
          <path d={svgPaths.p28ff5800} fill="var(--fill-0, black)" id="Vector_4" />
          <path d={svgPaths.p32177b30} fill="var(--fill-0, black)" id="Vector_5" />
        </g>
        <defs>
          <clipPath id="clip0_1_713">
            <rect fill="white" height="18.8889" width="116" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Content18() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-name="Content">
      <PlaceholderLightbox1 />
      <Stars1 />
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] text-black w-[352px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`"Elizabeth N. had this to say about garage lintel repair project:  "The crew was excellent!  They were good communicators and hard workers.  They were done well within the time frame that they gave me... Would I recommend Redeemers Group to others?  Absolutely!""`}</p>
    </div>
  );
}

function AvatarContent1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.5] min-w-px relative text-[16px] text-black" data-name="Avatar Content">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Elizabeth N.
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Collierville, TN
      </p>
    </div>
  );
}

function Avatar1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Avatar">
      <div className="relative shrink-0 size-[48px]" data-name="Avatar Image">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="48" src={imgAvatarImage} width="48" />
      </div>
      <AvatarContent1 />
    </div>
  );
}

function Column4() {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative" data-name="Column">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[32px] relative size-full">
          <Content18 />
          <Avatar1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PlayButton2() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[64px] top-[calc(50%+0.5px)]" data-name="Play Button">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 64">
        <g id="Play Button">
          <path clipRule="evenodd" d={svgPaths.p7ef280} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function PlaceholderLightbox2() {
  return (
    <div className="h-[203px] overflow-clip relative shrink-0 w-[352px]" data-name="Placeholder Lightbox">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgPlaceholderLightbox} />
        <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0" />
      </div>
      <PlayButton2 />
    </div>
  );
}

function Stars2() {
  return (
    <div className="h-[18.889px] relative shrink-0 w-[116px]" data-name="Stars">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116 18.8889">
        <g clipPath="url(#clip0_1_713)" id="Stars">
          <path d={svgPaths.p23629f00} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p84d7480} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p24418170} fill="var(--fill-0, black)" id="Vector_3" />
          <path d={svgPaths.p28ff5800} fill="var(--fill-0, black)" id="Vector_4" />
          <path d={svgPaths.p32177b30} fill="var(--fill-0, black)" id="Vector_5" />
        </g>
        <defs>
          <clipPath id="clip0_1_713">
            <rect fill="white" height="18.8889" width="116" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Content19() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-name="Content">
      <PlaceholderLightbox2 />
      <Stars2 />
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] text-black w-[352px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Redeemers Group, thank you so much. Walking into this place now, it's straight. I used to slip from side to another side. I went into my bedroom, the closet door never closed before, and I literally just closed it for the first time since we've been here over a month. So, great job.`}</p>
    </div>
  );
}

function AvatarContent2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.5] min-w-px relative text-[16px] text-black" data-name="Avatar Content">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Melissa and Russell C.
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal relative shrink-0 w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Marked Tree, AR
      </p>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Avatar">
      <div className="relative shrink-0 size-[48px]" data-name="Avatar Image">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="48" src={imgAvatarImage} width="48" />
      </div>
      <AvatarContent2 />
    </div>
  );
}

function Column5() {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative" data-name="Column">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[32px] relative size-full">
          <Content19 />
          <Avatar2 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Row">
      <Column3 />
      <Column4 />
      <Column5 />
    </div>
  );
}

function Content16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content">
      <Row2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Content15 />
      <Content16 />
    </div>
  );
}

function Stats() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Stats / 53 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function TaglineWrapper9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Featured projects
      </p>
    </div>
  );
}

function Content20() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 text-black text-center w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[56px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Real homes, real results
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{`See how we've solved foundation problems across the region`}</p>
    </div>
  );
}

function SectionTitle2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center max-w-[768px] relative shrink-0 w-full" data-name="Section Title">
      <TaglineWrapper9 />
      <Content20 />
    </div>
  );
}

function Info() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Info">
      <div className="bg-[#eee] content-stretch flex items-start px-[8px] py-[4px] relative shrink-0" data-name="Tag">
        <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[14px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Crawl space
        </p>
      </div>
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[14px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Memphis, TN
      </p>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-black w-full" data-name="Title">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.3] relative shrink-0 text-[32px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        East Memphis Ranch Home
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sagging floors + mold. Full SmartJack system + encapsulation. Completed in 2 days.
      </p>
    </div>
  );
}

function Content24() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Content">
      <Info />
      <Title />
    </div>
  );
}

function Content23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
        <Content24 />
        <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Button">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Read full story
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
  );
}

function Card6() {
  return (
    <div className="bg-white relative shrink-0 w-[768px]" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="aspect-[768/400] relative shrink-0 w-full" data-name="Placeholder Image">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage2} />
        </div>
        <Content23 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Info1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Info">
      <div className="bg-[#eee] content-stretch flex items-start px-[8px] py-[4px] relative shrink-0" data-name="Tag">
        <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[14px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Foundation
        </p>
      </div>
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[14px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Memphis, TN
      </p>
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-black w-full" data-name="Title">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.3] relative shrink-0 text-[32px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Midtown Duplex
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Clay soil settlement cracking both units. 6 push piers. Lifetime warranty issued.
      </p>
    </div>
  );
}

function Content26() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Content">
      <Info1 />
      <Title1 />
    </div>
  );
}

function Content25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
        <Content26 />
        <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Button">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Read full story
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
  );
}

function Card7() {
  return (
    <div className="bg-white relative shrink-0 w-[768px]" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="aspect-[768/400] relative shrink-0 w-full" data-name="Placeholder Image">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage2} />
        </div>
        <Content25 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start pl-[180px] relative size-full">
        <Card7 />
      </div>
    </div>
  );
}

function Info2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Info">
      <div className="bg-[#eee] content-stretch flex items-start px-[8px] py-[4px] relative shrink-0" data-name="Tag">
        <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[14px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Concrete
        </p>
      </div>
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[14px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Nashville, TN
      </p>
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-black w-full" data-name="Title">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.3] relative shrink-0 text-[32px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Nashville Townhome
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Chronic flooding after rain. Interior drainage + sump pump. Zero water in 3 years.
      </p>
    </div>
  );
}

function Content28() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Content">
      <Info2 />
      <Title2 />
    </div>
  );
}

function Content27() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
        <Content28 />
        <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Button">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Read full story
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
  );
}

function Card8() {
  return (
    <div className="bg-white relative shrink-0 w-[768px]" data-name="Card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="aspect-[768/400] relative shrink-0 w-full" data-name="Placeholder Image">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage2} />
        </div>
        <Content27 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function Content22() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start relative shrink-0" data-name="Content">
      <Card6 />
      <Frame12 />
      <Card8 />
    </div>
  );
}

function Content21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Content">
      <Content22 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <SectionTitle2 />
      <Content21 />
    </div>
  );
}

function Blog() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Blog / 30 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function TaglineWrapper10() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>{`We're in your neighborhood`}</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex h-[28px] items-center justify-center p-[4px] relative rounded-[5px] shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Memphis, TN
      </p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex h-[28px] items-center justify-center p-[4px] relative rounded-[5px] shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Nashville, TN
      </p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex h-[28px] items-center justify-center p-[4px] relative rounded-[5px] shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Chattanooga, TN
      </p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex h-[28px] items-center justify-center p-[4px] relative rounded-[5px] shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Jackson, MS
      </p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex h-[28px] items-center justify-center p-[4px] relative rounded-[5px] shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Little Rock, AR
      </p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0">
      <Frame14 />
      <Frame15 />
      <Frame16 />
      <Frame17 />
      <Frame18 />
    </div>
  );
}

function Content31() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] min-w-full relative shrink-0 text-[48px] text-black w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Serving the mid-South since 2008
      </p>
      <Frame13 />
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[18px] text-black w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Foundation work shouldn't break the bank. We offer flexible financing to fit your situation.`}</p>
    </div>
  );
}

function SectionTitle3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Section Title">
      <TaglineWrapper10 />
      <Content31 />
    </div>
  );
}

function ListItem() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="List Item">
      <ul className="block flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        <li className="list-disc ms-[24px]">
          <span className="leading-[1.5]">Flexible payment plans available</span>
        </li>
      </ul>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="List Item">
      <ul className="block flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        <li className="list-disc ms-[24px]">
          <span className="leading-[1.5]">No money down options</span>
        </li>
      </ul>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="List Item">
      <ul className="block flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[0] min-w-px relative text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        <li className="list-disc ms-[24px]">
          <span className="leading-[1.5]">Competitive interest rates</span>
        </li>
      </ul>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
    </div>
  );
}

function Content30() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Content">
      <SectionTitle3 />
      <List />
    </div>
  );
}

function Actions10() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Actions">
      <div className="relative shrink-0" data-name="Button">
        <div className="content-stretch flex items-center justify-center overflow-clip px-[24px] py-[12px] relative rounded-[inherit] size-full">
          <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            View all services areas
          </p>
        </div>
        <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
      </div>
      <div className="content-stretch flex gap-[8px] items-center justify-center opacity-0 overflow-clip relative shrink-0" data-name="Button">
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Apply now
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

function Content29() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px relative" data-name="Content">
      <Content30 />
      <Actions10 />
    </div>
  );
}

function Component4() {
  return (
    <div className="content-stretch flex gap-[80px] items-center relative shrink-0 w-full" data-name="Component">
      <Content29 />
      <div className="aspect-[600/640] flex-[1_0_0] min-w-px relative" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlaceholderImage3} />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Component4 />
    </div>
  );
}

function Layout1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Layout / 19 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Content33() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 text-center text-white w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[48px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Ready to protect your home?
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[18px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Free inspection · No pressure · Same-week availability
      </p>
    </div>
  );
}

function Actions11() {
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

function Content32() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-center max-w-[768px] min-w-px relative" data-name="Content">
      <Content33 />
      <Actions11 />
    </div>
  );
}

function Card9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgHeader111} />
        <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0" />
      </div>
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center p-[64px] relative size-full">
          <Content32 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Card9 />
    </div>
  );
}

function Cta() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip px-[64px] py-[112px] relative shrink-0 w-[1440px]" data-name="CTA / 53 /">
      <Container7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[64px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="h-[24px] relative shrink-0 w-[163px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
    </div>
  );
}

function Column6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Column">
      <div className="bg-white content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 w-full" data-name="Navbar / 1 /">
        <Container9 />
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
        Basement
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

function Column7() {
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

function Column8() {
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
        Memphis, TN
      </p>
    </div>
  );
}

function Link16() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Nashville, TN
      </p>
    </div>
  );
}

function Link17() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Chattanooga, TN
      </p>
    </div>
  );
}

function Link18() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Jackson, MS
      </p>
    </div>
  );
}

function Link19() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Little Rock, AR
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
      <Link19 />
    </div>
  );
}

function Column9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip relative" data-name="Column">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Locations
      </p>
      <FooterLinks2 />
    </div>
  );
}

function Link20() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Why work with us
      </p>
    </div>
  );
}

function Link21() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Job positions
      </p>
    </div>
  );
}

function Link22() {
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
      <Link20 />
      <Link21 />
      <Link22 />
    </div>
  );
}

function Column10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip relative" data-name="Column">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Carrers
      </p>
      <FooterLinks3 />
    </div>
  );
}

function Link23() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        (901) 555-0100
      </p>
    </div>
  );
}

function Link24() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        info@redeemersgroup.com
      </p>
    </div>
  );
}

function Link25() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        Schedule inspection
      </p>
    </div>
  );
}

function Link26() {
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
      <Link23 />
      <Link24 />
      <Link25 />
      <Link26 />
    </div>
  );
}

function Column11() {
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
      <Column6 />
      <Column7 />
      <Column8 />
      <Column9 />
      <Column10 />
      <Column11 />
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

function Row3() {
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
      <Row3 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Links />
      <Credits />
    </div>
  );
}

function Footer({ className }: { className?: string }) {
  return (
    <div className={className || "bg-white relative shrink-0 w-full"} data-name="Footer">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[80px] relative size-full">
          <Container8 />
        </div>
      </div>
    </div>
  );
}

export default function HomeDesktop() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Home • Desktop">
      <Header />
      <Header1 />
      <Layout2 />
      <Layout />
      <Stats />
      <Blog />
      <Layout1 />
      <Cta />
      <Footer />
    </div>
  );
}