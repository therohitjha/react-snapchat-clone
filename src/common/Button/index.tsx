import React from 'react';
import classNames from 'classnames';
import Icon from 'common/Icon';
import './index.scss';

interface Props {
  image?: string;
  icon?: string;
  icons?: string[];
  iconClass?: string;
  iconClasses?: Array<string | null>;
  buttonClass?: string;
  round?: boolean;
  plain?: boolean;
  purple?: boolean;
  label?: string;
  onclick?: () => void;
  testId?: string;
}

const Button: React.FC<Props> = ({
  image,
  icon,
  icons,
  iconClass = '',
  iconClasses = [],
  buttonClass = '',
  round,
  plain,
  purple,
  label,
  onclick,
  testId
}) => (
  <button
    type="button"
    onClick={onclick}
    className={classNames('btn', {
      [buttonClass]: true,
      round,
      plain,
      purple
    })}
    data-test={testId}
  >
    {image ? (
      <img src={image} alt="" />
    ) : icons ? (
      icons.map((icon, index) => (
        <Icon
          key={icon + index}
          icon={icon}
          className={classNames({
            [iconClasses[index] as string]: iconClasses[index]
          })}
        />
      ))
    ) : icon ? (
      <Icon
        icon={icon}
        className={classNames({
          [iconClass]: true
        })}
      />
    ) : null}
    {label && <strong>{label}</strong>}
  </button>
);

export default Button;
