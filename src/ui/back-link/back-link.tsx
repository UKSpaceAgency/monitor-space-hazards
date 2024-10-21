import { useRouter } from 'next/navigation';

type BackLinkProps = {
  text?: string;
};

export function BackLink({ text = 'Back' }: BackLinkProps) {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()} className="govuk-back-link" aria-describedby={text}>
      {text}
    </button>
  );
}

export default BackLink;
