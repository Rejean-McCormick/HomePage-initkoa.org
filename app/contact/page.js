import PageSection from '../../components/PageSection';

export const metadata = {
  title: 'Contact – King Klown & KOA',
  description: 'Get in touch with the KOA team for collaborations and partnerships.',
};

export default function ContactPage() {
  return (
    <PageSection>
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      <div className="bg-slate-50 p-8 rounded-xl border border-gray-200">
        <p className="text-lg mb-6">
          Do you have questions, proposals, or partnership ideas? 
          We operate with an open door policy for constructive collaboration.
        </p>

        <div className="flex items-center space-x-3">
          <span className="text-2xl"></span>
          <a 
            href="mailto:k@kingklown.com" 
            className="text-2xl font-bold text-primary hover:underline"
          >
            k@kingklown.com
          </a>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Connect on Social Media</h2>
        <p>
          Follow the movement, watch the <em>Mythos</em>, and join the conversation on our platforms.
          (Links available in the footer).
        </p>
      </div>
    </PageSection>
  );
}