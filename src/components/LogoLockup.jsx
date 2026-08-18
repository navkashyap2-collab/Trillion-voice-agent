import logoMark from "../assets/logo-mark.svg";

export default function LogoLockup({ iconClassName = "h-9 w-9" }) {
  return (
    <span className="flex items-center gap-2.5">
      <img src={logoMark} alt="" width="36" height="36" className={iconClassName} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-tight">
          <span className="text-ink">Smart</span>
          <span className="text-[#2fae4e]">Dial</span>
        </span>
        <span className="mt-1 flex items-center gap-1.5 text-[10px] font-bold tracking-[0.28em] text-ink">
          <span className="h-px w-2.5 bg-[#2fae4e]" aria-hidden="true" />
          SOLUTIONS
          <span className="h-px w-2.5 bg-[#2fae4e]" aria-hidden="true" />
        </span>
      </span>
    </span>
  );
}
