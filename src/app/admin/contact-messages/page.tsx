import ContactMessageHeader from "@/components/admin/contactMessage/ContactMessageHeader";
import ContactMessageTable from "@/components/admin/contactMessage/ContactMessageTable"
import { getContactMessages } from "@/lib/queries/admin";

export default async function ContactMessagesPage() {
  const messages = await getContactMessages();
  console.log(messages)

  return (
    <div className="space-y-6">
       <ContactMessageHeader/>
      <ContactMessageTable messages={messages} />
    </div>
  );
}