export type CommunityNavigationItem = {
  href: `/${string}`;
  iconSrc: `/${string}`;
  label: string;
  exact?: boolean;
};

export const communityNavigationItems: readonly CommunityNavigationItem[] = [
  {
    href: "/rules",
    iconSrc: "/svgs/auto_stories.svg",
    label: "Rules",
  },
];
