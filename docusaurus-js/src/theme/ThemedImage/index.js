import React from 'react';
import {ThemedComponent} from '@docusaurus/theme-common';
export default function ThemedImage(props) {
  const {sources, className: parentClassName, alt, ...propsRest} = props;
  return (
    <ThemedComponent className={parentClassName}>
      {({theme, className}) => (
        <img
          src={sources[theme]}
          alt={alt}
          className={className}
          {...propsRest}
        />
      )}
    </ThemedComponent>
  );
}
