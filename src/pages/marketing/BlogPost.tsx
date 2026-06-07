import { useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Button, Chip, Heading, Text, Eyebrow } from "@/components/basic";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { POSTS, formatPostDate } from "./Blog";
import "./Blog.css";

/**
 * BlogPost — single-article layout. Reads the `:slug` route param, finds the
 * post in the exported POSTS array, and renders a readable article (title, meta,
 * body) with a back link and a conversion CTA. Falls back gracefully when the
 * slug doesn't match a known post. Renders inside MarketingLayout.
 */
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = POSTS.find((p) => p.slug === slug);

  useDocumentTitle(
    post ? post.title : "Article not found",
    post?.excerpt ?? "The article you're looking for isn't here."
  );

  // ---- Not found ----
  if (!post) {
    return (
      <section className="band-cream section" aria-labelledby="article-missing-title">
        <div className="container">
          <div className="article-missing">
            <Eyebrow>Blog</Eyebrow>
            <Heading level={1} id="article-missing-title">
              We couldn't find that article
            </Heading>
            <Text size="lg" tone="body">
              The link may be out of date or the post may have moved. Browse the latest writing
              instead.
            </Text>
            <Button href="/blog" variant="cta" size="lg" leadingIcon={ArrowLeft}>
              Back to the blog
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="band-cream section" aria-labelledby="article-title">
      <div className="container">
        <article className="article">
          <a className="article__back" href="/blog">
            <ArrowLeft size={16} weight="bold" aria-hidden />
            All articles
          </a>

          <header className="article__header">
            <div className="article__meta">
              <Chip tone="peach" size="sm">
                {post.category}
              </Chip>
              <Text as="span" size="sm" tone="muted">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingTime}
              </Text>
            </div>
            <Heading level={1} id="article-title" className="article__title">
              {post.title}
            </Heading>
            <Text size="lg" tone="body">
              {post.excerpt}
            </Text>
          </header>

          <div className="article__body">
            {(post.body ?? [{ paragraphs: [post.excerpt] }]).map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <Heading level={2} as="h2">
                    {section.heading}
                  </Heading>
                )}
                {section.paragraphs.map((para, j) => (
                  <Text key={j} size="md" tone="body" className="article__p">
                    {para}
                  </Text>
                ))}
              </section>
            ))}
          </div>

          {/* Conversion CTA */}
          <aside className="article__cta" aria-label="Work with Camille">
            <Eyebrow>Put this into practice</Eyebrow>
            <Heading level={3}>Bring training like this to your program</Heading>
            <Text size="md" tone="body">
              Workshops and certification tailored to your team, in person across Metro Atlanta or
              online.
            </Text>
            <div className="article__cta-actions">
              <Button href="/pricing" variant="cta" size="lg" trailingIcon={ArrowRight}>
                See pricing
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Get in touch
              </Button>
            </div>
          </aside>
        </article>
      </div>
    </section>
  );
}
