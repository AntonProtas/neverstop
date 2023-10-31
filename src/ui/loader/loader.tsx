import s from './loader.module.css';

export function Loader() {
  return (
    <div className={s.overlay}>
      <div className={s.box}>
        <span className={s.loader} />
      </div>
    </div>
  );
}
