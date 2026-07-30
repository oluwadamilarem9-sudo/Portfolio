# Client testimonial photos

Place **client photos** here so each testimonial shows their image in the Client Testimonials section.

## Filenames (match the names in `src/data/portfolio.js`)

| Client         | Filename            |
|----------------|---------------------|
| Mark Halland   | `mark-halland.png`  |
| Kelvin Diallo  | `kelvin-diallo.png` |
| Steven Mensah  | `steven-mensah.png` |

**Formats:** PNG, JPG, or WebP  
**Recommended:** Square or near-square (e.g. 200×200) so they look good in the circular avatar.

If you add or rename testimonials in `portfolio.js`, add an `image` field for each, e.g. `image: "/testimonials/your-filename.png"`. If no image is set or the file is missing, a generated avatar (initials) is shown instead.
