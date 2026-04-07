export interface Template {
  _id: string;
  name: string;
  slug: string;
  description: string;

  stack: string[];
  tags: string[];
  repoUrl: string;
  version: string;

  isPro: boolean;
  creditCost: number;

  isPublished: boolean;
  isFeatured: boolean;
  isSponsored: boolean;
  isDeleted: boolean;
  sponserdBy: {
    name: string;
    url: string;
    logo: string;
  };

  isRepoTemplate: boolean;
  installer: {
    name: string;
    dependencies: string[];
    devDependencies: string[];
    installCommand: string;
    addDependenciesCommand: string;
    addDevDependenciesCommand: string;
  };

  folderStructureImage: string;
  videoUrl: string;

  views: number;
  copies: number;
  downloads: number;

  createdAt: Date;
  updatedAt: Date;
}
