export type NewType = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: {
    type: string; // Por ejemplo, "paragraph"
    children: {
      text: string; // El texto del párrafo
      type: string; // Por ejemplo, "text"
    }[];
  }[];
  author: string;
  published_date: string; // Fecha de publicación en formato ISO
  priority: number;
  external_link: string; // URL de un enlace externo
  createdAt: string; // Fecha de creación en formato ISO
  updatedAt: string; // Fecha de actualización en formato ISO
  publishedAt: string; // Fecha de publicación en formato ISO
  featured_image: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null; // Puede ser null
    caption: string | null; // Puede ser null
    width: number;
    height: number;
    formats: {
      large?: ImageFormat;
      medium?: ImageFormat;
      small?: ImageFormat;
      thumbnail?: ImageFormat;
    };
    hash: string;
    ext: string; // Extensión del archivo (e.g., ".jpeg")
    mime: string; // Tipo MIME (e.g., "image/jpeg")
    size: number; // Tamaño del archivo en KB
    url: string; // URL de la imagen
    previewUrl: string | null; // Puede ser null
    provider: string; // Por ejemplo, "local"
    provider_metadata: any | null; // Puede ser null
    createdAt: string; // Fecha de creación en formato ISO
    updatedAt: string; // Fecha de actualización en formato ISO
    publishedAt: string; // Fecha de publicación en formato ISO
  };
  category: {
    id: number;
    documentId: string;
    createdAt: string; // Fecha de creación en formato ISO
    updatedAt: string; // Fecha de actualización en formato ISO
    publishedAt: string; // Fecha de publicación en formato ISO
    name: string; // Nombre de la categoría
    description: string; // Descripción de la categoría
  };
};

type ImageFormat = {
  ext: string; // Extensión del archivo (e.g., ".jpeg")
  url: string; // URL de la imagen
  hash: string; // Hash de la imagen
  mime: string; // Tipo MIME (e.g., "image/jpeg")
  name: string; // Nombre del archivo
  path: string | null; // Puede ser null
  size: number; // Tamaño en KB
  width: number; // Ancho de la imagen
  height: number; // Alto de la imagen
  sizeInBytes?: number; // Tamaño en bytes (opcional)
};
