import React, { useEffect, useRef } from "react";
import classNames from "classnames";

export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}

export enum ButtonColor {
  Primary = "primary",
  Secondary = "secondary",
  Default = "default",
  Success = "success",
  Danger = "danger",
  Warning = "warning",
  Info = "info",
}

export enum ButtonAppearance {
  Round = "round",
  Square = "square",
}

export enum ButtonVariant {
  Contained = "contained",
  Outlined = "outlined",
  Ghosted = "ghosted"
}
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  noRipple?: boolean;
  appearance?: ButtonAppearance;
  color?: ButtonColor;
  link?: boolean;
  variant?: ButtonVariant;
  children: React.ReactNode;
  href?: string;
}

type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = ({
  className,
  disabled,
  size,
  noRipple,
  appearance,
  color,
  link,
  variant,
  children,
  href,
  ...restProps
}) => {
  const classes = classNames("btn", {
    disabled: link && disabled,
    ripple: !noRipple,
    [`btn-${size}`]: size,
    [`btn-${appearance}`]: appearance,
    "btn-link": link,
    [`btn-${variant}`]: variant,
    [`btn-${color}`]: color,
    [`${className}`]: className
  });

  const btn = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const cur = btn?.current;
    const clickRippleHandler = (e: MouseEvent) => {
      const element = e.currentTarget as HTMLElement;
      let left = e.pageX - element.offsetLeft;
      let top = e.pageY - element.offsetTop;
      let ripple = document.createElement("span");
      ripple.classList.add("ripple-cover");
      ripple.style.left = left + "px";
      ripple.style.top = top + "px";
      element.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 500);
    };
    if (!noRipple && !disabled) {
      cur?.addEventListener("click", clickRippleHandler);
    }
    return () => cur?.removeEventListener("click", clickRippleHandler);
  }, []);

  if (link && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} ref={btn} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  color: ButtonColor.Default,
  noRipple: false,
};

export default Button;
