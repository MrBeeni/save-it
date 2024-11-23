import { getFiles, getTotalSpaceUsed } from '@/actions/file.actions';
import Card from '@/components/Card';
import Sort from '@/components/Sort';
import {
  convertFileSize,
  getFileTypesParams,
  getUsageSummary,
} from '@/lib/utils';
import { FileType, SearchParamProps } from '@/types';
import { Models } from 'node-appwrite';
import React from 'react';

const Page = async ({ params, searchParams }: SearchParamProps) => {
  const type = ((await params)?.type as string) || '';
  const searchText = ((await searchParams)?.query as string) || '';
  const sort = ((await searchParams)?.sort as string) || '';
  const types = getFileTypesParams(type) as FileType[];
  const files = await getFiles({ types, searchText, sort });

  const totalSpace = await getTotalSpaceUsed();

  const usageSummary = getUsageSummary(totalSpace);
  const total = usageSummary.find(
    (summary) => summary.title.toLowerCase() === type.toLowerCase(),
  )?.size;

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5"> {convertFileSize(total) || 0}</span>
          </p>

          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>

            <Sort />
          </div>
        </div>
      </section>

      {/* Render the files */}
      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default Page;
