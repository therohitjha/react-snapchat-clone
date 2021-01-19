import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { onAnimationComplete } from 'utils';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  placeholder: string;
  value?: string;
  leftIcon?: string;
  rightIcon?: string;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
  focus?: boolean;
  spellCheck?: boolean;
  animate?: boolean;
  dark?: boolean;
}

const Input: React.FC<Props> = ({
  placeholder,
  value,
  leftIcon,
  rightIcon,
  onClick,
  onFocus,
  onBlur,
  onChange,
  onEnter,
  focus,
  spellCheck,
  animate,
  dark
}) => {
  const inputElem = useRef<HTMLInputElement>(null);
  const [full, setFull] = useState(false);

  useEffect(() => {
    if (animate) setFull(true);
    onAnimationComplete(() => {
      if (focus) inputElem?.current?.focus();
    });
  }, [animate, focus]);

  const disabled = onClick ? true : false;

  return (
    <div className={classNames('input', { animate, full, dark })} data-test="input">
      {disabled && <div className="disabled-overlay" onClick={onClick} />}
      {leftIcon && <Icon icon={leftIcon} className="left-icon" />}
      <input
        type="text"
        ref={inputElem}
        placeholder={placeholder}
        value={value}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onKeyPress={({ key }) => onEnter && key === 'Enter' && onEnter()}
        disabled={disabled}
        spellCheck={spellCheck || false}
        className={classNames({ 'has-left-icon': leftIcon })}
        data-test="field"
      />
      {rightIcon && <Icon icon={rightIcon} className="right-icon" />}
    </div>
  );
};

export default Input;
