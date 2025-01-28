/* eslint-disable react/prop-types */
import { QuillField } from '../../../../components';

import { DottedPercentageSlider } from '../PercentageSliders';
const LanguageSection = ({ userData, setActiveQuill }) => {
  return (
    <div className="w-full flex flex-col overflow-hidden  pl-28 ">
      <div className="w-full  flex gap-5 items-center">
        <span className="inline-block w-16 h-16 bg-green-dark flex-shrink-0 rounded-full" />
        <span className="text-green-light uppercase font-bold text-[18px]">
          Language
        </span>
        <span className="w-full h-[3px] bg-green-light"></span>
      </div>
      <div className="w-full h-full flex flex-col ml-[4%]">
        <div className="w-full h-full border-l-4 border-l-green-dark">
          <div className="w-full h-full flex flex-col  pl-14 pb-10 pt-20 gap-5">
            {userData?.language?.map((language, index) => (
              <div key={index} className="flex items-center gap-5">
                <div>
                  <QuillField
                    defaultValue={language?.name}
                    onSelectionChange={(range, quill, changeSpanDisplay) =>
                      setActiveQuill(quill, changeSpanDisplay)
                    }
                  />
                </div>
                <div className="w-full h-[15px]">
                  <DottedPercentageSlider level={language?.level} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSection;
