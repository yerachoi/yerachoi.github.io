// @flow
import React from 'react';
import moment from 'moment';
import styles from './Meta.module.scss';

type Props = {
  date: string
};

const Meta = ({ date, language }: Props) => (
  <div className={styles['meta']}>
    <p className={styles['meta__date']}>
      {`${language === 'en' ? 'Published: ' : '발행일: '} `}
      {moment(date).format(language === 'en' ? 'MMMM D, YYYY' : 'YYYY년 M월 D일')}
    </p>
  </div>
);

export default Meta;
