import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { signOutUser } from '@/actions/user.actions';
import FileUploader from './FileUploader';
import Search from './Search';

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  return (
    <header className="header">
      <Search />

      <div className="header-wrapper">
        <FileUploader ownerId={userId} accountId={accountId} />
        <form
          action={async () => {
            'use server';

            await signOutUser();
          }}
        >
          <Button type="submit" className="sign-out-button">
            <Image
              src="/assets/icons/logout.svg"
              alt="logo"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};
export default Header;
