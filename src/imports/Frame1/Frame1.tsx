import svgPaths from "./svg-nkctwdqehn";
import imgPlaceholderImage from "./2685dd01025a359455692b2635e1a3dff9349f22.png";
import imgPlaceholderImage1 from "./b7b4e314cc3eb923b7fa8aac8183d1866fe76120.png";

function TaglineWrapper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Crawl space
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex h-[28px] items-center justify-center p-[4px] relative rounded-[5px] shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Service 1
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex h-[28px] items-center justify-center p-[4px] relative rounded-[5px] shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Service 2
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex h-[28px] items-center justify-center p-[4px] relative rounded-[5px] shrink-0">
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Service 3
      </p>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] min-w-full relative shrink-0 text-[24px] text-black w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        My floors are sagging
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[16px] text-black w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        We handle encapsulation, structural repair, and moisture control.
      </p>
      <Frame1 />
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function ContentTop() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content Top">
      <TaglineWrapper />
      <Content1 />
    </div>
  );
}

function Actions() {
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

function Content() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] relative size-full">
          <ContentTop />
          <Actions />
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
        <Content />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function TaglineWrapper1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Foundation Repair
      </p>
    </div>
  );
}

function Content3() {
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
      <TaglineWrapper1 />
      <Content3 />
    </div>
  );
}

function Actions1() {
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
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] relative size-full">
          <ContentTop1 />
          <Actions1 />
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
        Waterproofing
      </p>
    </div>
  );
}

function Content5() {
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
      <TaglineWrapper2 />
      <Content5 />
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

function Content4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] relative size-full">
          <ContentTop2 />
          <Actions2 />
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
        <Content4 />
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

function Component() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1280px]" data-name="Component">
      <Row />
    </div>
  );
}

function TaglineWrapper3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Concrete Services
      </p>
    </div>
  );
}

function Content7() {
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
      <TaglineWrapper3 />
      <Content7 />
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

function Content6() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] relative size-full">
          <ContentTop3 />
          <Actions3 />
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
        <Content6 />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none" />
    </div>
  );
}

function TaglineWrapper4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[1.5] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Mold prevention
      </p>
    </div>
  );
}

function Content9() {
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
      <TaglineWrapper4 />
      <Content9 />
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

function Content8() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] relative size-full">
          <ContentTop4 />
          <Actions4 />
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
        Insulation
      </p>
    </div>
  );
}

function Content11() {
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
      <TaglineWrapper5 />
      <Content11 />
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

function Content10() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center p-[24px] relative size-full">
          <ContentTop5 />
          <Actions5 />
        </div>
      </div>
    </div>
  );
}

function Card5() {
  return (
    <div className="bg-white flex-[1_0_0] h-[423px] min-w-px relative" data-name="Card">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <Content10 />
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

function Component1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1280px]" data-name="Component">
      <Row1 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative size-full">
      <Component />
      <Card3 />
      <Component1 />
    </div>
  );
}