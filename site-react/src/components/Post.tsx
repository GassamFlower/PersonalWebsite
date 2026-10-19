// Post — 文章子页（docs/j §4 · 宪法 §1.2）：一篇 md 发射中/英两张静态 HTML，路径由 routes.ts 单点解析。
// 不挂 SiteNav：首页各区的锚点在子页上没有落点，宁可少一条导航也不给死链；返回走「回写作区」一条原生 <a>。
// 取字口径：衬线面只有本页 title 与 h1 与 ## 小标题；正文与摘要一律 data-font="sans"，
// 文章写多长都不涨字体字节——改回衬线必须同时删那个标记，否则线上缺字（scripts/fonts.mjs 扫 dist/**/*.html）。
import { parseBlocks } from '../lib/markdown';
import type { WritingData } from '../lib/content';
import { useUi } from '../i18n/LocaleContext';
import { pick } from '../i18n/enums';
import { homePath, postPath } from '../lib/routes';
import Footer from './Footer';
import s from './Post.module.css';

export default function Post({ post }: { post: WritingData }) {
  const { t, locale } = useUi();
  // 英文页只读 bodyEn，中文页只读 body：两边由 check-content 规则④ 保证同时存在
  const src = locale === 'en' ? post.bodyEn ?? '' : post.body;
  return (
    <>
      <a className="skip-link" href="#main">{t.shell.skipLink}</a>
      <header className={s.bar}>
        <div className={`container ${s.barInner}`}>
          <a className={s.back} href={`${homePath(locale)}#writing`}>← {t.post.back}</a>
          <span className={s.langSwitch} role="group" aria-label={t.nav.langAria}>
            <a href={postPath(post.slug, 'zh')} lang="zh-CN" className={locale === 'zh' ? s.langOn : undefined}>{'中'}</a>
            <a href={postPath(post.slug, 'en')} lang="en" className={locale === 'en' ? s.langOn : undefined}>{'EN'}</a>
          </span>
        </div>
        <div className={s.barRule}></div>
      </header>
      <main id="main" tabIndex={-1}>
        {/* .container 只管左右留白（它的 max-width 会盖过列宽），阅读列宽收在这里这一层 */}
        <div className="container">
          <article className={s.doc}>
            <span className={s.date}>{post.date}</span>
            <h1 className={s.title}>{pick(locale, post.title, post.titleEn)}</h1>
            <p className={s.summary} data-font="sans">{pick(locale, post.summary, post.summaryEn)}</p>
            <div className={s.body}>
              {parseBlocks(src).map((b, j) =>
                b.kind === 'h' ? <h2 key={j} className={s.h}>{b.text}</h2>
                  : b.kind === 'p' ? <p key={j} data-font="sans">{b.text}</p>
                    : <ul key={j}>{b.items.map((x, k) => <li key={k} data-font="sans">{x}</li>)}</ul>
              )}
            </div>
            {post.source && (
              <p className={s.source} data-font="sans">
                {t.post.source}{' '}
                <a className="ink-link" href={post.source} rel="noopener noreferrer">{post.sourceName ?? post.source}</a>
              </p>
            )}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
