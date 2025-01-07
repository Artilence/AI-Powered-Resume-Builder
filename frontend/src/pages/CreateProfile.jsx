import React from 'react';
import Layout from '../components/Layout/Layout';
import {
  useForm,
  useFieldArray,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from '../yup-schemas';
import { useDispatch } from 'react-redux';
import { createUserProfile } from '../app/userProfiles/userProfiles';

//////////////////////////
// Nested Projects Section
//////////////////////////
function ProjectsSection({ item, index, removeProject }) {
  // Access form methods and errors from the parent (FormProvider) context
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  // useFieldArray for the technologies array inside this specific project
  const {
    fields: technologyFields,
    append: addTechnology,
    remove: removeTechnology,
  } = useFieldArray({
    control,
    name: `projects.${index}.technologies`,
  });

  // Retrieve errors specific to this project
  const projectErrors = errors.projects?.[index] || {};

  return (
    <div className="mb-4 border-b pb-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Project Name:</label>
          <input
            type="text"
            {...register(`projects.${index}.projectName`)}
            placeholder="Project Name"
            className="border p-3 rounded w-full"
          />
          {projectErrors.projectName && (
            <p className="text-red-500 text-sm">
              {projectErrors.projectName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">Project Link:</label>
          <input
            type="text"
            {...register(`projects.${index}.link`)}
            placeholder="Project Link"
            className="border p-3 rounded w-full"
          />
          {projectErrors.link && (
            <p className="text-red-500 text-sm">{projectErrors.link.message}</p>
          )}
        </div>
      </div>
      <div className="mt-3">
        <label className="block font-semibold mb-1">Description:</label>
        <textarea
          {...register(`projects.${index}.description`)}
          placeholder="Description"
          className="border p-3 rounded w-full"
        ></textarea>
        {projectErrors.description && (
          <p className="text-red-500 text-sm">
            {projectErrors.description.message}
          </p>
        )}
      </div>

      {/* Technologies Used */}
      <div className="mt-3">
        <h3 className="text-xl font-semibold mb-2">Technologies Used</h3>
        {technologyFields.map((tech, techIndex) => (
          <div key={tech.id} className="flex items-center mb-2">
            <input
              type="text"
              {...register(`projects.${index}.technologies.${techIndex}`)}
              placeholder={`Technology ${techIndex + 1}`}
              className="border p-2 rounded flex-1"
            />
            <button
              type="button"
              onClick={() => removeTechnology(techIndex)}
              className="text-red-500 ml-2"
            >
              Remove
            </button>
            {/* If you want to display errors per technology: */}
            {projectErrors.technologies &&
              projectErrors.technologies[techIndex]?.message && (
                <p className="text-red-500 text-sm ml-2">
                  {projectErrors.technologies[techIndex].message}
                </p>
              )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addTechnology('')}
          className="text-blue-500 mt-2"
        >
          + Add Technology
        </button>
        {projectErrors.technologies?.message && (
          <p className="text-red-500 text-sm">
            {projectErrors.technologies.message}
          </p>
        )}
      </div>

      {/* Remove Project Button */}
      <button
        type="button"
        onClick={() => removeProject(index)}
        className="text-red-500 mt-2"
      >
        Remove Project
      </button>
    </div>
  );
}

//////////////////////////
// Main CreateProfile Component
//////////////////////////
const CreateProfile = () => {
  const dispatch = useDispatch();

  // Using FormProvider to share methods with nested components
  const methods = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      profile_name: '',
      name: '',
      position: '',
      email: '',
      phone: '',
      address: '',
      summary: '',

      experiences: [
        { title: '', company: '', startDate: '', endDate: '', description: '' },
      ],
      education: [
        {
          degree: '',
          institution: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
      projects: [
        { projectName: '', description: '', technologies: [''], link: '' },
      ],
      certifications: [
        {
          certificationName: '',
          issuingOrganization: '',
          date: '',
          credentialID: '',
          credentialURL: '',
        },
      ],
      languages: [{ language: '', proficiency: '' }],
      hobbies: [''],
      social_links: [{ platform: '', url: '' }],
      skills: [],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  // Field arrays
  const {
    fields: experienceFields,
    append: addExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: 'experiences',
  });

  const {
    fields: educationFields,
    append: addEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const {
    fields: projectFields,
    append: addProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: 'projects',
  });

  const {
    fields: certificationFields,
    append: addCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: 'certifications',
  });

  const {
    fields: languageFields,
    append: addLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: 'languages',
  });

  const {
    fields: hobbyFields,
    append: addHobby,
    remove: removeHobby,
  } = useFieldArray({
    control,
    name: 'hobbies',
  });

  const {
    fields: socialLinkFields,
    append: addSocialLink,
    remove: removeSocialLink,
  } = useFieldArray({
    control,
    name: 'social_links',
  });

  const {
    fields: skillFields,
    append: addSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: 'skills',
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log('Form Data:', data);
    dispatch(createUserProfile(data));
  };

  return (
    <Layout>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-4xl m-10 mx-auto p-10 bg-white rounded-lg shadow-lg"
        >
          <h1 className="text-4xl font-bold mb-6">Create Your Profile</h1>

          {/* Profile Name */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Profile Name</label>
            <input
              type="text"
              {...register('profile_name')}
              className="w-full border p-3 rounded"
            />
            {errors.profile_name && (
              <p className="text-red-500 text-sm">
                {errors.profile_name.message}
              </p>
            )}
          </div>

          {/* Personal Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              Personal Information
            </h2>
            <div className="mb-3">
              <label className="block font-semibold mb-1 capitalize">
                Name:
              </label>
              <input
                type="text"
                {...register('name')}
                className="w-full border p-3 rounded"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1 capitalize">
                Position:
              </label>
              <input
                type="text"
                {...register('position')}
                className="w-full border p-3 rounded"
              />
              {errors.position && (
                <p className="text-red-500 text-sm">
                  {errors.position.message}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1 capitalize">
                Email:
              </label>
              <input
                type="text"
                {...register('email')}
                className="w-full border p-3 rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1 capitalize">
                Phone:
              </label>
              <input
                type="text"
                {...register('phone')}
                className="w-full border p-3 rounded"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1 capitalize">
                Address:
              </label>
              <input
                type="text"
                {...register('address')}
                className="w-full border p-3 rounded"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="block font-semibold mb-1 capitalize">
                Summary:
              </label>
              <textarea
                {...register('summary')}
                className="w-full border p-3 rounded"
              />
              {errors.summary && (
                <p className="text-red-500 text-sm">{errors.summary.message}</p>
              )}
            </div>
          </div>

          {/* Experiences */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Experiences</h2>
            {experienceFields.map((item, index) => (
              <div key={item.id} className="mb-4 border-b pb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Title:</label>
                    <input
                      type="text"
                      {...register(`experiences.${index}.title`)}
                      placeholder="Title"
                      className="border p-3 rounded w-full"
                    />
                    {errors.experiences && errors.experiences[index]?.title && (
                      <p className="text-red-500 text-sm">
                        {errors.experiences[index].title.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Company:</label>
                    <input
                      type="text"
                      {...register(`experiences.${index}.company`)}
                      placeholder="Company"
                      className="border p-3 rounded w-full"
                    />
                    {errors.experiences &&
                      errors.experiences[index]?.company && (
                        <p className="text-red-500 text-sm">
                          {errors.experiences[index].company.message}
                        </p>
                      )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Start Date:
                    </label>
                    <input
                      type="month"
                      {...register(`experiences.${index}.startDate`)}
                      className="border p-3 rounded w-full"
                    />
                    {errors.experiences &&
                      errors.experiences[index]?.startDate && (
                        <p className="text-red-500 text-sm">
                          {errors.experiences[index].startDate.message}
                        </p>
                      )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      End Date:
                    </label>
                    <input
                      type="month"
                      {...register(`experiences.${index}.endDate`)}
                      className="border p-3 rounded w-full"
                    />
                    {errors.experiences &&
                      errors.experiences[index]?.endDate && (
                        <p className="text-red-500 text-sm">
                          {errors.experiences[index].endDate.message}
                        </p>
                      )}
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block font-semibold mb-1">
                    Description:
                  </label>
                  <textarea
                    {...register(`experiences.${index}.description`)}
                    placeholder="Description"
                    className="border p-3 rounded w-full"
                  ></textarea>
                  {errors.experiences &&
                    errors.experiences[index]?.description && (
                      <p className="text-red-500 text-sm">
                        {errors.experiences[index].description.message}
                      </p>
                    )}
                </div>
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 mt-2"
                >
                  Remove Experience
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addExperience({
                  title: '',
                  company: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                })
              }
              className="text-blue-500"
            >
              + Add Experience
            </button>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            {skillFields.map((item, index) => (
              <div key={item.id} className="mb-3 flex items-center">
                <div>
                  <label className="block font-semibold mb-1">Skill:</label>
                  <input
                    type="text"
                    {...register(`skills.${index}`)}
                    placeholder="Skill"
                    className="border p-3 rounded w-full"
                  />
                  {errors.skills && errors.skills[index] && (
                    <p className="text-red-500 text-sm">
                      {errors.skills[index].message}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-red-500 ml-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addSkill('')}
              className="text-blue-500"
            >
              + Add Skill
            </button>
            {errors.skills?.message && (
              <p className="text-red-500 text-sm">{errors.skills.message}</p>
            )}
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Education</h2>
            {educationFields.map((item, index) => (
              <div key={item.id} className="mb-4 border-b pb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Degree:</label>
                    <input
                      type="text"
                      {...register(`education.${index}.degree`)}
                      placeholder="Degree"
                      className="border p-3 rounded w-full"
                    />
                    {errors.education && errors.education[index]?.degree && (
                      <p className="text-red-500 text-sm">
                        {errors.education[index].degree.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Institution:
                    </label>
                    <input
                      type="text"
                      {...register(`education.${index}.institution`)}
                      placeholder="Institution"
                      className="border p-3 rounded w-full"
                    />
                    {errors.education &&
                      errors.education[index]?.institution && (
                        <p className="text-red-500 text-sm">
                          {errors.education[index].institution.message}
                        </p>
                      )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Start Date:
                    </label>
                    <input
                      type="month"
                      {...register(`education.${index}.startDate`)}
                      className="border p-3 rounded w-full"
                    />
                    {errors.education && errors.education[index]?.startDate && (
                      <p className="text-red-500 text-sm">
                        {errors.education[index].startDate.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      End Date:
                    </label>
                    <input
                      type="month"
                      {...register(`education.${index}.endDate`)}
                      className="border p-3 rounded w-full"
                    />
                    {errors.education && errors.education[index]?.endDate && (
                      <p className="text-red-500 text-sm">
                        {errors.education[index].endDate.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block font-semibold mb-1">
                    Description:
                  </label>
                  <textarea
                    {...register(`education.${index}.description`)}
                    placeholder="Description"
                    className="border p-3 rounded w-full"
                  ></textarea>
                  {errors.education && errors.education[index]?.description && (
                    <p className="text-red-500 text-sm">
                      {errors.education[index].description.message}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 mt-2"
                >
                  Remove Education
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addEducation({
                  degree: '',
                  institution: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                })
              }
              className="text-blue-500"
            >
              + Add Education
            </button>
          </div>

          {/* Projects */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            {projectFields.map((item, index) => (
              <ProjectsSection
                key={item.id}
                item={item}
                index={index}
                removeProject={removeProject}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                addProject({
                  projectName: '',
                  description: '',
                  technologies: [''],
                  link: '',
                })
              }
              className="text-blue-500"
            >
              + Add Project
            </button>
          </div>

          {/* Certifications */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
            {certificationFields.map((item, index) => (
              <div key={item.id} className="mb-4 border-b pb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">
                      Certification Name:
                    </label>
                    <input
                      type="text"
                      {...register(`certifications.${index}.certificationName`)}
                      placeholder="Certification Name"
                      className="border p-3 rounded w-full"
                    />
                    {errors.certifications &&
                      errors.certifications[index]?.certificationName && (
                        <p className="text-red-500 text-sm">
                          {
                            errors.certifications[index].certificationName
                              .message
                          }
                        </p>
                      )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Issuing Organization:
                    </label>
                    <input
                      type="text"
                      {...register(
                        `certifications.${index}.issuingOrganization`
                      )}
                      placeholder="Issuing Organization"
                      className="border p-3 rounded w-full"
                    />
                    {errors.certifications &&
                      errors.certifications[index]?.issuingOrganization && (
                        <p className="text-red-500 text-sm">
                          {
                            errors.certifications[index].issuingOrganization
                              .message
                          }
                        </p>
                      )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Date:</label>
                    <input
                      type="month"
                      {...register(`certifications.${index}.date`)}
                      className="border p-3 rounded w-full"
                    />
                    {errors.certifications &&
                      errors.certifications[index]?.date && (
                        <p className="text-red-500 text-sm">
                          {errors.certifications[index].date.message}
                        </p>
                      )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Credential ID:
                    </label>
                    <input
                      type="text"
                      {...register(`certifications.${index}.credentialID`)}
                      placeholder="Credential ID"
                      className="border p-3 rounded w-full"
                    />
                    {errors.certifications &&
                      errors.certifications[index]?.credentialID && (
                        <p className="text-red-500 text-sm">
                          {errors.certifications[index].credentialID.message}
                        </p>
                      )}
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block font-semibold mb-1">
                    Credential URL:
                  </label>
                  <input
                    type="text"
                    {...register(`certifications.${index}.credentialURL`)}
                    placeholder="Credential URL"
                    className="border p-3 rounded w-full"
                  />
                  {errors.certifications &&
                    errors.certifications[index]?.credentialURL && (
                      <p className="text-red-500 text-sm">
                        {errors.certifications[index].credentialURL.message}
                      </p>
                    )}
                </div>
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="text-red-500 mt-2"
                >
                  Remove Certification
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addCertification({
                  certificationName: '',
                  issuingOrganization: '',
                  date: '',
                  credentialID: '',
                  credentialURL: '',
                })
              }
              className="text-blue-500"
            >
              + Add Certification
            </button>
          </div>

          {/* Languages */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Languages</h2>
            {languageFields.map((item, index) => (
              <div key={item.id} className="mb-3 flex items-center">
                <div>
                  <label className="block font-semibold mb-1">Language:</label>
                  <input
                    type="text"
                    {...register(`languages.${index}.language`)}
                    placeholder="Language"
                    className="border p-3 rounded w-full"
                  />
                  {errors.languages && errors.languages[index]?.language && (
                    <p className="text-red-500 text-sm">
                      {errors.languages[index].language.message}
                    </p>
                  )}
                </div>
                <div className="ml-2">
                  <label className="block font-semibold mb-1">
                    Proficiency:
                  </label>
                  <select
                    {...register(`languages.${index}.proficiency`)}
                    className="border p-3 rounded w-full"
                  >
                    <option value="">Select Proficiency</option>
                    <option value="Basic">Basic</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native">Native</option>
                  </select>
                  {errors.languages && errors.languages[index]?.proficiency && (
                    <p className="text-red-500 text-sm">
                      {errors.languages[index].proficiency.message}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  className="text-red-500 ml-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addLanguage({ language: '', proficiency: '' })}
              className="text-blue-500"
            >
              + Add Language
            </button>
          </div>

          {/* Hobbies */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Hobbies</h2>
            {hobbyFields.map((item, index) => (
              <div key={item.id} className="mb-3 flex items-center">
                <div>
                  <label className="block font-semibold mb-1">Hobby:</label>
                  <input
                    type="text"
                    {...register(`hobbies.${index}`)}
                    placeholder="Hobby"
                    className="border p-3 rounded w-full"
                  />
                  {errors.hobbies && errors.hobbies[index] && (
                    <p className="text-red-500 text-sm">
                      {errors.hobbies[index].message}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeHobby(index)}
                  className="text-red-500 ml-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addHobby('')}
              className="text-blue-500"
            >
              + Add Hobby
            </button>
          </div>

          {/* Social Links */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Social Links</h2>
            {socialLinkFields.map((item, index) => (
              <div key={item.id} className="mb-4 border-b pb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">
                      Platform:
                    </label>
                    <select
                      {...register(`social_links.${index}.platform`)}
                      className="border p-3 rounded w-full"
                    >
                      <option value="">Select Platform</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="GitHub">GitHub</option>
                      <option value="Twitter">Twitter</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.social_links &&
                      errors.social_links[index]?.platform && (
                        <p className="text-red-500 text-sm">
                          {errors.social_links[index].platform.message}
                        </p>
                      )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">URL:</label>
                    <input
                      type="text"
                      {...register(`social_links.${index}.url`)}
                      placeholder="URL"
                      className="border p-3 rounded w-full"
                    />
                    {errors.social_links && errors.social_links[index]?.url && (
                      <p className="text-red-500 text-sm">
                        {errors.social_links[index].url.message}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="text-red-500 mt-2"
                >
                  Remove Social Link
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addSocialLink({ platform: '', url: '' })}
              className="text-blue-500"
            >
              + Add Social Link
            </button>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-3 rounded">
            Submit
          </button>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default CreateProfile;
