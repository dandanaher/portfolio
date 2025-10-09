
import ScrollColumn from "@/components/shared/ScrollColumn";
import { academicNotes } from "@/data/samples";

const Academics = () => {
  return (
    <div className="flex flex-1 overflow-hidden">
      <ScrollColumn>
        {academicNotes.highlights.map((highlight) => (
          <p key={highlight} className="mb-4 text-gray-600">
            {highlight}
          </p>
        ))}
      </ScrollColumn>
      <ScrollColumn>
        {academicNotes.extras.map((extra) => (
          <p key={extra} className="mb-4 text-gray-600">
            {extra}
          </p>
        ))}
      </ScrollColumn>
    </div>
  );
};

export default Academics;
