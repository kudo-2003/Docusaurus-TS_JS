import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Test() {
  const context = useDocusaurusContext();
  console.log(context); // In ra toàn bộ object trong console
  return <div>Check console để xem context</div>;
}