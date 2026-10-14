// Contact — 封底（v6 §5：黑尾墨场 + 联系方式规格表 + 大号朱砂署名章「一个故事」）
import { useState } from 'react';
import s from './Contact.module.css';

const wechat = 'G10S7H21';
const emails = [
  '1462882928@qq.com',
  'luoyongui07@gmail.com',
  'dblandlyg@163.com',
];

export default function Contact() {
  const [label, setLabel] = useState('加微信聊聊');

  async function copyWechat() {
    try {
      await navigator.clipboard.writeText(wechat);
      setLabel('已复制 · ' + wechat);
    } catch {
      try {
        window.prompt('请手动复制微信号', wechat);
      } catch {
        /* 老环境忽略 */
      }
      return;
    }
    setTimeout(() => setLabel('加微信聊聊'), 1500);
  }

  return (
    <section id="contact" className={`section field ${s.contact}`}>
      <span className="plate-rail">封底 · BACK COVER</span>
      <div className={`container ${s.contactInner}`}>
        <div className="section-head">
          <span className="tag"><b>档案 08</b> · 联系</span>
          <span className="meta">08</span>
        </div>
        <div className={s.ctRule}></div>

        <div className={s.contactGrid}>
          <div className={s.contactMain}>
            <h2 className={s.contactTitle}>聊得来，就一起做事</h2>

            {/* 规格表体裁：联系方式作为可查字段 */}
            <dl className={s.spec}>
              <div className={s.specRow}>
                <dt>微信</dt>
                <dd className={s.specMono}>{wechat}</dd>
              </div>
              <div className={s.specRow}>
                <dt>邮箱</dt>
                <dd className={s.mailList}>
                  {emails.map((e) => (
                    <a key={e} className={`ink-link ${s.infoMail}`} href={`mailto:${e}`}>{e}</a>
                  ))}
                </dd>
              </div>
              <div className={s.specRow}>
                <dt>索取</dt>
                <dd className={s.specNote}>雇主与过程细节对公开版隐去 · 详询索取</dd>
              </div>
            </dl>

            <div className={s.contactActions}>
              <button className={s.btnPaper} data-copy={wechat} onClick={copyWechat}>{label}</button>
            </div>

            <p className={`rail ${s.contactSlogan}`}>PERSONAL DOSSIER · 把一团乱麻，理成能用的系统</p>
          </div>

          <div className={s.contactBack}>
            <div className={s.envelopeArt} aria-hidden="true">
              <svg viewBox="0 0 140 120" className={s.envelopeSvg}>
                <line x1="70" y1="6" x2="70" y2="22" stroke="var(--color-line)" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="70" y1="96" x2="70" y2="114" stroke="var(--color-line)" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="6" y1="58" x2="22" y2="58" stroke="var(--color-line)" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="118" y1="58" x2="134" y2="58" stroke="var(--color-line)" strokeWidth="0.8" strokeDasharray="2 2" />
                <g transform="rotate(-8 70 58)">
                  <rect x="22" y="34" width="96" height="50" rx="2" fill="none" stroke="var(--color-ink)" strokeWidth="1.6" />
                  <polyline points="22,36 70,68 118,36" fill="none" stroke="var(--color-ink)" strokeWidth="1.6" />
                  <line x1="22" y1="84" x2="56" y2="58" stroke="var(--color-line)" strokeWidth="0.8" />
                  <line x1="118" y1="84" x2="84" y2="58" stroke="var(--color-line)" strokeWidth="0.8" />
                </g>
              </svg>
            </div>

            {/* 署名章（v6 §5）：签名印而非验收印，不计入 ≤6 验收章纪律，全页仅此一枚 */}
            <div className={s.signWrap}>
              <span className={s.signSeal} aria-hidden="true">
                <span>一</span><span>个</span><span>故</span><span>事</span>
              </span>
              <span className={`rail ${s.signRail}`}>署名章 · 一个故事</span>
            </div>

            <span className="regmark" aria-hidden="true"><i className="k" /><i className="r" /><i className="w" /></span>
          </div>
        </div>
      </div>
    </section>
  );
}
