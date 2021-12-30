import slugify from 'slugify';

export default function convertToSlug(string) {
  return slugify(string, {
    remove: /[*+~.()`'"!:@|_&?%,#${}]/g,
    lower: true,
  });
}
