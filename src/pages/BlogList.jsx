import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';
import { SEO } from '../components/SEO';

export function BlogList() {

    useEffect(() => {
        if (analytics) {
            logEvent(analytics, 'screen_view', {
                firebase_screen: 'blog_list',
                screen_name: 'blog_list'
            });
        }
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <SEO
                title="금융 블로그 - 재테크, 대출, 자산 관리 꿀팁"
                description="슬기로운 금융 생활을 위한 유용한 정보를 제공합니다. 복리, 대출, 적금 등 필수 금융 지식을 확인하세요."
                url="/blog"
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Fin-Sight 금융 블로그",
                    "description": "재테크, 대출, 저축 등 다양한 금융 정보를 제공하는 블로그입니다.",
                    "url": "https://interest-calcu.web.app/blog"
                }}
            />
            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                    슬기로운 <span className="text-blue-600">금융 생활</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    복잡한 금융 지식을 쉽고 재미있게 풀어드립니다. <br />
                    당신의 자산을 지키고 불리는 금융 꿀팁을 만나보세요.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <article
                        key={post.id}
                        className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                    >
                        {/* Thumbnail Placeholder - Can be replaced with real images later */}
                        <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
                            <span className="text-6xl">📝</span>
                        </div>

                        <div className="flex-1 p-6 flex flex-col">
                            <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-3">
                                <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                                    {post.category}
                                </span>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {post.readTime}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                                <Link to={`/blog/${post.id}`}>
                                    {post.title}
                                </Link>
                            </h3>

                            <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-1">
                                {post.excerpt}
                            </p>

                            <Link
                                to={`/blog/${post.id}`}
                                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
                            >
                                자세히 보기
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
