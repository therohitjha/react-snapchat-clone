import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideDrawer } from 'AppShell/store';
import { language } from 'utils';
import Button from 'common/Button';
import Widget from 'common/Widget';
import ActionItem from 'common/Pod/ActionItem';
import Icon from 'common/Icon';
import Map from './Map';
import './index.scss';

const currentDate = new Date().toLocaleDateString(language, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const Account: React.FC = () => {
  const dispatch = useDispatch();
  const username = useSelector(({ user }) => user.session.username);

  return (
    <main className="account">
      <header>
        <Button
          icon="faAngleDown"
          onclick={() => dispatch(hideDrawer('account'))}
          buttonClass="btn-close"
        />
        <Icon icon="faCog" className="ico-gear" />
      </header>
      <div className="logo">
        <img src="./images/logo.svg" alt="" />
        <strong>{username}</strong>
      </div>
      <Widget header="Stories" transparent>
        <ActionItem leftIcon="faCamera" rightIcon="faEllipsisV" label="Add to My Story" />
        <ActionItem
          leftIcon="faCamera"
          rightIcon="faEllipsisV"
          label="Add to Our Story"
        />
      </Widget>
      <Widget header="Friends" transparent>
        <ActionItem leftIcon="faUserPlus" rightIcon="faAngleRight" label="Add Friends" />
        <ActionItem leftIcon="faListAlt" rightIcon="faAngleRight" label="My Friends" />
      </Widget>
      <Widget header="Bitmoji" transparent>
        <ActionItem
          leftIcon="faGrinBeam"
          rightIcon="faAngleRight"
          label="Create Bitmoji"
        />
      </Widget>
      <Widget header="Snap Map">
        <Map />
        <ActionItem
          leftIcon="faCompass"
          rightIcon="faAngleRight"
          label="Set a Status"
          straightEdge
        />
      </Widget>
      <footer>
        <p>
          <a
            href="https://github.com/TowhidKashem/snapchat-clone"
            target="_blank"
            rel="noopener noreferrer"
            title="Github Repo"
          >
            <Icon icon="faGithub" />
          </a>
          Joined SnapChat on {currentDate}
        </p>
      </footer>
    </main>
  );
};

export default Account;
