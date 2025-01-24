/* eslint-disable react/prop-types */
import { QuillField } from '../../../../components';

import { handleTextChange } from '../../../../ResumeStateUtils';
import { handleSelectionChange } from '../../../../ResumeStateUtils';
const LeftTopSection = ({ userData, setUserData, setActiveQuill }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-green-dark py-20 gap-14 w-full">
      {/* Profile Picture */}
      <div className="w-[100px] h-[100px] border border-gray-300 overflow-hidden flex items-center justify-center transform -rotate-45">
        <div
          className="w-full h-full transform rotate-45 scale-[2]"
          style={{
            backgroundImage: `url(${userData?.profilePicture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
      {/* Name and Position */}
      <div className="flex flex-col w-full items-center justify-center">
        <div className="text-white w-full text-center text-[20px] font-bold uppercase tracking-wider">
          {' '}
          <QuillField
            defaultValue={userData?.fullName}
            onTextChange={(content) =>
              handleTextChange(setUserData, 'fullName', content)
            }
            onSelectionChange={(range, quill) =>
              handleSelectionChange(setActiveQuill, range, quill)
            }
            defaultStyles={{
              align: 'center',
            }}
          />
        </div>
        <div className="text-white w-full font-normal capitalize text-[14px] tracking-wider">
          <QuillField
            defaultValue={userData?.position}
            onTextChange={(content) =>
              handleTextChange(setUserData, 'position', content)
            }
            onSelectionChange={(range, quill) =>
              handleSelectionChange(setActiveQuill, range, quill)
            }
            defaultStyles={{
              align: 'center',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LeftTopSection;
