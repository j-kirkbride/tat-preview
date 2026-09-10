/* =========================================================
   TAT — form settings
   ---------------------------------------------------------
   Both the party enquiry form and the job application form
   read their settings from here. This is the only file to
   edit to change where the mail goes.
   ========================================================= */

window.TAT_FORMS = {

  /* Where submissions are emailed. */
  to: ["tatristorante@aol.com", "jkirkbride13@gmail.com"],

  /* The address of the mail script that actually sends the message.
     A browser cannot speak SMTP on its own, so a small server-side
     script has to do it — see server/README.md for the one supplied
     and how to deploy it.

     Leave this empty and the forms still work: they fall back to
     opening the visitor's own email program with everything already
     filled in. That's worth keeping as a fallback even after the
     script is live, in case it's ever down. */
  endpoint: "",

  /* Shown on the "thanks" screen after a successful send. */
  phone: "(614) 236-1392"
};
