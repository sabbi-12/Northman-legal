// 15 abstract textures supplied for the Services grid, shuffled onto the
// 15 current service ids one-to-one (every photo used exactly once, order
// deliberately not 1-2-3... so it reads as random) rather than tied to a
// specific practice area's meaning — used as pure background texture, not
// literal illustration. Shared by the Services grid cards
// (ServicePhotoCard) and each service detail page's hero, so a given
// service shows the same photo in both places.
export const SERVICE_PHOTOS = [
  "/images/services-bg/service-bg-1.jpg",
  "/images/services-bg/service-bg-2.jpg",
  "/images/services-bg/service-bg-3.jpg",
  "/images/services-bg/service-bg-4.jpg",
  "/images/services-bg/service-bg-5.jpg",
  "/images/services-bg/service-bg-6.jpg",
  "/images/services-bg/service-bg-7.jpg",
  "/images/services-bg/service-bg-8.jpg",
  "/images/services-bg/service-bg-9.jpg",
  "/images/services-bg/service-bg-10.jpg",
  "/images/services-bg/service-bg-11.jpg",
  "/images/services-bg/service-bg-12.jpg",
  "/images/services-bg/service-bg-13.jpg",
  "/images/services-bg/service-bg-14.jpg",
  "/images/services-bg/service-bg-15.jpg",
];

export const SERVICE_ID_TO_PHOTO: Record<string, string> = {
  "company-incorporation": SERVICE_PHOTOS[7],
  "dispute-resolution": SERVICE_PHOTOS[2],
  "real-estate-construction": SERVICE_PHOTOS[11],
  "employment-law": SERVICE_PHOTOS[0],
  "intellectual-property": SERVICE_PHOTOS[9],
  "technology-media-telecom": SERVICE_PHOTOS[4],
  "regulatory-compliance": SERVICE_PHOTOS[13],
  tax: SERVICE_PHOTOS[6],
  "restructuring-insolvency": SERVICE_PHOTOS[1],
  "white-collar-crime": SERVICE_PHOTOS[8],
  "competition-antitrust": SERVICE_PHOTOS[12],
  "family-business": SERVICE_PHOTOS[3],
  "corporate-commercial-ma": SERVICE_PHOTOS[10],
  "banking-finance": SERVICE_PHOTOS[14],
  "capital-markets": SERVICE_PHOTOS[5],
};

export function getServicePhoto(id: string, index: number): string {
  return SERVICE_ID_TO_PHOTO[id] || SERVICE_PHOTOS[index % SERVICE_PHOTOS.length];
}
