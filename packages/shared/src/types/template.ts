export interface SponsoredBy {
  name?: string;
  url?: string;
  logo?: string;
}

export interface Installer {
  name: string;
  dependencies: string;
  devDependencies: string;
  installCommand: string;
  addDependenciesCommand: string;
  addDevDependenciesCommand: string;
}

export interface Template {
  _id: string;

  name: string;
  slug: string;
  description: string;

  stack: string[];
  tags: string[];
  features: string[];

  githubRepoUrl: string;
  version: string;

  liveUrl?: string;
  folderStructure: string;

  isPremium: boolean;
  cost: number;

  isPublished: boolean;
  isFeatured: boolean;
  isDeleted: boolean;

  isSponsored: boolean;
  sponsoredBy?: SponsoredBy[];

  isRepoTemplate: boolean;
  installer: Installer;

  imageUrl: string;
  views: number;
  downloads: number;

  createdAt: Date;
  updatedAt: Date;
}
