
import ScrollColumn from "@/components/shared/ScrollColumn";
import { contactNotes } from "@/data/samples";

const Contact = () => {
  return (
    <div className="flex flex-1 overflow-hidden">
      <ScrollColumn>
        {contactNotes.details.map((detail) => (
          <p key={detail} className="mb-4 text-[#3c3d3b]">
            {detail}
          </p>
        ))}
      </ScrollColumn>
      <ScrollColumn>
        {contactNotes.followUp.map((note) => (
          <p key={note} className="mb-4 text-[#3c3d3b]">
            {note}
          </p>
        ))}
      </ScrollColumn>
    </div>
  );
};

export default Contact;
