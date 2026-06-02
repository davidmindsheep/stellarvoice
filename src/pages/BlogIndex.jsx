import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTABanner from '../components/CTABanner';
import { getAllPosts } from '../data/blogPosts';
import './BlogIndex.css';

const fmtDate = (iso) => {
    try {
        return new Date(iso).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
        return iso;
    }
};

// /blog — Insights index. Featured (most recent) post sits on top as a
// large card; the rest render in a 3-column responsive grid.
export default function BlogIndex() {
    const posts = getAllPosts();
    const [featured, ...rest] = posts;

    return (
        <>
            <Navbar />
            <main className="bi-page">
                {/* HERO BAND */}
                <section className="bi-hero">
                    <div className="container bi-hero-inner">
                        <p className="bi-hero-eyebrow">Insights</p>
                        <h1>Field notes from the front line of voice AI.</h1>
                        <p className="bi-hero-sub">
                            Research, data, and what we are seeing live. No fluff, no recycled vendor copy.
                            Built for sales-led businesses who care about what actually works.
                        </p>
                    </div>
                </section>

                {/* FEATURED POST */}
                {featured && (
                    <section className="bi-featured-wrap">
                        <div className="container">
                            <Link to={`/blog/${featured.slug}`} className="bi-featured">
                                {featured.heroImage ? (
                                    <img
                                        src={featured.heroImage}
                                        alt={featured.heroImageAlt ?? featured.heroVisual?.label ?? ''}
                                        className="bi-featured-img"
                                    />
                                ) : (
                                    <div className="bi-featured-visual" aria-hidden="true">
                                        <span className="bi-featured-marker">Hero visual</span>
                                        <p className="bi-featured-visual-title">{featured.heroVisual?.label}</p>
                                    </div>
                                )}
                                <div className="bi-featured-body">
                                    <div className="bi-card-tags">
                                        <span className="bi-tag bi-tag-featured">Featured</span>
                                        <span className="bi-tag bi-tag-category">{featured.category}</span>
                                    </div>
                                    <h2>{featured.title}</h2>
                                    <p className="bi-featured-dek">{featured.dek}</p>
                                    <p className="bi-featured-meta">
                                        <strong>{featured.author}</strong>
                                        <span>·</span>
                                        <span>{fmtDate(featured.date)}</span>
                                        <span>·</span>
                                        <span>{featured.readTime} read</span>
                                    </p>
                                    <span className="bi-featured-cta">Read article &rarr;</span>
                                </div>
                            </Link>
                        </div>
                    </section>
                )}

                {/* REMAINING POSTS GRID */}
                {rest.length > 0 && (
                    <section className="bi-grid-section">
                        <div className="container">
                            <div className="bi-grid">
                                {rest.map((post) => (
                                    <Link key={post.slug} to={`/blog/${post.slug}`} className="bi-card">
                                        {post.heroImage ? (
                                            <img
                                                src={post.heroImage}
                                                alt={post.heroImageAlt ?? post.heroVisual?.label ?? ''}
                                                className="bi-card-img"
                                            />
                                        ) : (
                                            <div className="bi-card-visual" aria-hidden="true">
                                                <span className="bi-card-marker">{post.category}</span>
                                            </div>
                                        )}
                                        <div className="bi-card-body">
                                            <div className="bi-card-tags">
                                                <span className="bi-tag bi-tag-category">{post.category}</span>
                                            </div>
                                            <h3>{post.title}</h3>
                                            <p className="bi-card-dek">{post.dek}</p>
                                            <p className="bi-card-meta">
                                                <strong>{post.author}</strong> · {post.readTime} read
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <CTABanner />
            </main>
            <Footer />
        </>
    );
}
