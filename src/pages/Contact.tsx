
import ScrollColumn from "@/components/shared/ScrollColumn";
import { contactNotes } from "@/data/samples";

const Contact = () => {
  return (
    <div className="flex flex-1 overflow-hidden">
      <ScrollColumn>
        {contactNotes.details.map((detail) => (
          <p key={detail} className="mb-4 text-gray-600">
            {detail}
          </p>
        ))}
      </ScrollColumn>
      <ScrollColumn>
        {contactNotes.followUp.map((note) => (
          <p key={note} className="mb-4 text-gray-600">
            {note}
          </p>
        ))}
      </ScrollColumn>
    </div>
  );
};

export default Contact;
