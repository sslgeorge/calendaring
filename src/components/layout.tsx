import React from 'react';
import { ComponentChildren } from 'preact';

type Props = {
  children: ComponentChildren;
};

export function Layout(props: Props) {
  const { children } = props;
  return <div>{children}</div>;
}
