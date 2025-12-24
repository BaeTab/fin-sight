import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';
import { SEO } from '../components/SEO';

export function BlogPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = blogPosts.find(p => p.id === id);

    useEffect(() => {
        if (post && analytics) {
            logEvent(analytics, 'screen_view', {
                firebase_screen: 'blog_post',
                screen_name: `blog_${post.id}`
            });

            logEvent(analytics, 'view_item', {
                item_id: post.id,
                item_name: post.title,
                item_category: post.category
            });
        }
    }, [post]);

    if (!post) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">게시글을 찾을 수 없습니다.</h2>
                <Link to="/blog" className="text-blue-600 hover:underline">
                    블로그 목록으로 돌아가기
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <SEO
                title={post.title}
                description={post.excerpt}
                url={`/blog/${post.id}`}
                type="article"
                keywords={`${post.category}, 이자 계산, 적금, 대출, 재테크`}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": post.title, // Title of the post
                    "description": post.excerpt,
                    "datePublished": post.date,
                    "author": {
                        "@type": "Organization",
                        "name": "Fin-Sight"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "Fin-Sight",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://interest-calcu.web.app/favicon.png"
                        }
                    },
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": `https://interest-calcu.web.app/blog/${post.id}`
                    }
                }}
            />
            <button
                onClick={() => navigate('/blog')}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                목록으로 돌아가기
            </button>

            <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <header className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 md:p-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-blue-100 text-sm font-medium mb-4">
                        <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                            <Tag className="w-3 h-3" /> {post.category}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-6 text-blue-100 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {post.readTime} 읽음
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="p-8 md:p-12 lg:px-16">
                    <div
                        className="prose prose-lg md:prose-xl prose-blue max-w-none text-gray-700 space-y-2
              prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mt-8 prose-headings:mb-4
              prose-p:leading-relaxed
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-li:marker:text-blue-500"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>

                {/* Footer Area */}
                <div className="bg-gray-50 px-8 py-8 border-t border-gray-100 text-center">
                    <p className="text-gray-600 font-medium mb-4">
                        이 글이 도움이 되셨나요?
                    </p>
                    <Link
                        to="/blog"
                        className="inline-block px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        다른 글 보러가기
                    </Link>
                </div>
            </article>
        </div>
    );
}
