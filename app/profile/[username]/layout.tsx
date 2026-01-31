import type { FC, ReactNode } from "react";
import { ModalSlotPortal } from "@/components/home/modal-slot-portal";

interface ProfileLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const ProfileLayout: FC<ProfileLayoutProps> = ({ children, modal }) => {
  return (
    <>
      {children}
      <ModalSlotPortal>{modal}</ModalSlotPortal>
    </>
  );
};

export default ProfileLayout;
