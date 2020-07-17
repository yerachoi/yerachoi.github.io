// @flow
import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import styles from './LanguageSwitcher.module.scss';
import {
  pageExist,
  getCorrespondingPath
} from '../../../utils/get-corresponding-link';
import useTagsPathList from '../../../hooks/use-tags-path-list';
import useCategoriesPathList from '../../../hooks/use-categories-path-list';

const LanguageSwitcher = ({ link, language, path }) => {
  const [enLinkExist, setEnLinkExist] = useState(null);
  const [koLinkExist, setKoLinkExist] = useState(null);
  const tagsPathList = path.includes('/tag/') ? useTagsPathList() : null;
  const categoriesPathList = path.includes('/category/')
    ? useCategoriesPathList()
    : null;
  const ref = React.createRef();

  useEffect(() => {
    if (link && !link.exist) {
      return;
    }
    if (path.includes('/category/') || path.includes('/tag/')) {
      if (
        pageExist(
          path,
          path.includes('/tag/') ? tagsPathList : categoriesPathList
        )
      ) {
        language === 'en' ? setKoLinkExist(true) : setEnLinkExist(true);
      }
      return;
    }
    if (language === 'en') {
      setKoLinkExist(true);
    } else {
      setEnLinkExist(true);
    }
  }, []);

  const otherLanguagePath = (language, currentPath) => {
    if (currentPath.includes('/page/')) {
      if (language === '/ko') {
        return '/';
      }
      return '/ko';
    } else if (
      currentPath.includes('/category/') ||
      currentPath.includes('/tag/')
    ) {
      return getCorrespondingPath(currentPath);
    }
    if (currentPath.includes('/ko')) {
      return currentPath.replace('/ko', '');
    }
    return currentPath + '/ko';
  };

  const languageOnClick = (clickedLang, displayedLanguage) => {
    if (clickedLang === displayedLanguage || (!enLinkExist && !koLinkExist)) {
      return;
    }
    let path = '';
    if (link) {
      if (!link.exist) {
        return;
      }
      path = link.path;
    } else {
      path = otherLanguagePath(language, location.pathname);
    }
    ref.current.style.left = path.slice(-3) === '/ko' ? '50%' : '0';
    setTimeout(() => navigate(path), 30);
  };

  const pointerClassName = language => {
    if (language === 'en') {
      return enLinkExist
        ? styles['language-switcher__languages__pointer']
        : styles['language-switcher__languages__unavailable'];
    }
    return koLinkExist
      ? styles['language-switcher__languages__pointer']
      : styles['language-switcher__languages__unavailable'];
  };
  return (
    <div className={styles['language-switcher']}>
      <div
        ref={ref}
        className={styles['language-switcher__back']}
        style={{ left: language === 'en' ? 0 : '50%' }}
      />
      <div className={styles['language-switcher__languages']}>
        <span
          onClick={() => languageOnClick('en', language)}
          className={`${
            language === 'en'
              ? styles['language-switcher__languages-active']
              : ''
          } ${pointerClassName('en')}`}
        >
          A
        </span>
        <span
          onClick={() => languageOnClick('ko', language)}
          className={`${
            language === 'ko'
              ? styles['language-switcher__languages-active']
              : ''
          } ${pointerClassName('ko')}`}
        >
          한
        </span>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
