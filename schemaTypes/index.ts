import {page} from './page'
import {heroSection} from './sections/heroSection'
import {contentSection} from './sections/contentSection'
import {gallerySection} from './sections/gallerySection'
import {ctaSection} from './sections/ctaSection'
import {featuredEstablishmentsSection} from './sections/featuredEstablishmentsSection'
import {latestNewsSection} from './sections/latestNewsSection'
import {contactSection} from './sections/contactSection'
import {establishment} from './establishment'
import {news} from './newsSimple'
import {ads} from './ads'

export const schemaTypes = [
  // Pages and Sections
  page,
  heroSection,
  contentSection,
  gallerySection,
  ctaSection,
  featuredEstablishmentsSection,
  latestNewsSection,
  contactSection,
  
  // Content Types
  establishment,
  news,
  ads,
]
