'use client';

import { useState } from 'react';
import { Book, Save, Play } from 'lucide-react';
import styles from './page.module.css';

type BookStatus = 'available' | 'wait' | 'borrowed' | 'held';

type BookType = {
  id: number;
  title: string;
  desc: string;
  status: BookStatus;
  wait: string;
};

export default function Home() {
  const [compact, setCompact] = useState(false);
  const [books, setBooks] = useState<BookType[]>(
    Array.from({ length: 15 }).map((_, i) => ({
      id: i + 1,
      title: `Book Title ${i + 1}`,
      desc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis ultricies purus.',
      status: i % 3 === 0 ? 'available' : 'wait',
      wait: i % 3 === 0 ? 'Available now' : `${4 + i} week wait`,
    }))
  );

  const toggleHold = (id: number) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        if (b.status === 'available') return { ...b, status: 'borrowed' };
        if (b.status === 'borrowed') return { ...b, status: 'available' };
        if (b.status === 'wait') return { ...b, status: 'held' };
        if (b.status === 'held') return { ...b, status: 'wait' };
        return b;
      })
    );
  };

  const getButtonLabel = (status: BookStatus) => {
    switch (status) {
      case 'available':
        return 'Borrow';
      case 'borrowed':
        return 'Return';
      case 'wait':
        return 'Place Hold';
      case 'held':
        return 'Cancel Hold';
    }
  };

  return (
    <div className={styles.stage}>
      <div className={styles.phoneFrame}>
        <header className={styles.header}>
          <div className={styles.toggleBlock}>
            <span className={styles.toggleLabel}>View Mode</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={compact}
                onChange={() => setCompact((v) => !v)}
              />
              <span className={styles.slider}></span>
            </label>
            <span className={styles.toggleText}>
              {compact ? 'Compact' : 'Cozy'}
            </span>
          </div>
        </header>

        <main className={styles.content}>
          {/* --- COZY --- */}
          {!compact && (
            <section className={styles.cozyList}>
              {books.map((b) => (
                <article key={b.id} className={styles.cozyCard}>
                  <div className={styles.availPill}>
                    <span className={styles.waitText}>{b.wait}</span>
                        <span
                          className={`${styles.splitIcon} ${
                            b.status === 'available' || b.status === 'borrowed'
                              ? styles.splitTeal
                              : styles.splitOrange
                          }`}
                        />
                  </div>
                  <h3 className={styles.cozyTitle}>{b.title}</h3>
                  <div className={styles.cozyRow}>
                    <div className={styles.cover}>
                      <Book className={styles.bookIcon} />
                    </div>

                    <div className={styles.actionCol}>
                      <button
                        className={styles.linkBtn}
                        onClick={() => toggleHold(b.id)}
                      >
                        {getButtonLabel(b.status)}
                      </button>
                      <button className={styles.linkBtn}>
                        <Play size={16} /> &nbsp; Read Sample
                      </button>
                      <button className={styles.linkBtn}>
                        <Save size={16} /> &nbsp; Save
                      </button>
                    </div>
                  </div>

                  <p className={styles.desc}>{b.desc}</p>

                  <button
                    className={`${styles.borrowBtn} ${
                      b.status === 'available' || b.status === 'borrowed'
                        ? styles.borrowTeal
                        : styles.borrowOrange
                    }`}
                    onClick={() => toggleHold(b.id)}
                  >
                    {getButtonLabel(b.status)}
                  </button>
                </article>
              ))}
            </section>
          )}

          {/* --- COMPACT --- */}
          {compact && (
            <section className={styles.compactList}>
              {books.map((b) => (
                <article key={b.id} className={styles.compactRow}>
                  <div className={styles.rowLeft}>
                    <div className={styles.rowTitle}>{b.title}</div>
                    <div className={styles.rowMeta}>{b.wait}</div>
                  </div>

                  <div className={styles.rowBtns}>
                    <button className={styles.iconBtn}>
                      <Save size={18} />
                    </button>
                    <button className={styles.iconBtn}>
                      <Play size={18} />
                    </button>
                    <button
                      className={`${styles.iconBtnPrimary} ${
                        b.status === 'wait' || b.status === 'held'
                          ? styles.iconBtnHold     
                          : styles.iconBtnBorrow   
                      }`}
                      onClick={() => toggleHold(b.id)}
                      title={getButtonLabel(b.status)}
                    >
                      +
                    </button>
                  </div>
                </article>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
