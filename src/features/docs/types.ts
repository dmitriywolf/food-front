interface ICreateDocData {
  title: string;
  docUrl: string;
  file?: File;
}

interface IEditDocData {
  _id: string;
  title: string;
  docUrl: '';
  file?: File;
}

export { ICreateDocData, IEditDocData };
