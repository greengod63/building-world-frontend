export type navMenuItem = {
  icon?: JSX.Element;
  name?: string;
  url?: string;
};

export type NavItemProps = {
  index: number;
  icon?: JSX.Element;
  text: string;
  url: string;
  menuItems: navMenuItem[];
  activeCategory: number;
  setActiveCategory: React.Dispatch<React.SetStateAction<number>>;
};

type subItemProps = {
  name: string;
  url: string;
  enabled: boolean;
};

export type navBarResponse = {
  ok?: boolean;
  description?: string;
  result: navbarProps[];
};

export type navbarProps = {
  name: string;
  url: string;
  enabled: boolean;
  subitems: subItemProps[];
};