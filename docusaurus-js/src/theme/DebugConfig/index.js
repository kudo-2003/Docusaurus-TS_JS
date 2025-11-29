import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import DebugLayout from '@theme/DebugLayout';
import DebugJsonView from '@theme/DebugJsonView';
export default function DebugMetadata() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <DebugLayout>
      <h2>Site config</h2>
      <DebugJsonView src={siteConfig} collapseDepth={3} />
    </DebugLayout>
  );
}
