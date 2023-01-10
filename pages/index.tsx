import { IndexSEO } from 'components/SEO';
import site from 'data/meta/site';

export default function Home() {
  return (
    <>
      <IndexSEO />
      <div className="divide-y">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7">{site.description}</p>
        </div>
      </div>
    </>
  );
}
