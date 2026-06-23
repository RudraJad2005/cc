import { motion } from 'framer-motion';

export function DPA() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#000] text-white selection:bg-white selection:text-black font-sans items-center">
      
      <div className="max-w-[800px] w-full px-8 py-20 md:py-32">
         {/* ───────────────── Header ───────────────── */}
         <header className="border-b border-white/[0.1] pb-12 mb-12">
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-[1.1]"
            >
               Data Processing Agreement
            </motion.h1>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="flex flex-col md:flex-row md:items-center gap-4 text-[#888] font-mono text-sm"
            >
               <div>EFFECTIVE DATE: <span className="text-white">NOV 12, 2026</span></div>
               <div className="hidden md:block text-white/[0.2]">|</div>
               <div>VERSION: <span className="text-white">2.1.0</span></div>
            </motion.div>
         </header>

         {/* ───────────────── Document Body ───────────────── */}
         <motion.article 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="prose prose-invert prose-p:text-[#888] prose-p:leading-relaxed prose-h2:text-2xl prose-h2:font-bold prose-h2:tracking-tight prose-h2:mb-4 prose-h2:mt-12 max-w-none"
         >
            <p>
               This Data Processing Agreement ("DPA") forms part of the Master Services Agreement or Terms of Service ("Agreement") between Collab Code Inc. ("Collab Code", "we", "us", or "our") and the customer ("Customer", "you", or "your") who has executed the Agreement.
            </p>

            <h2>1. Definitions</h2>
            <p>
               <strong>"Applicable Data Protection Laws"</strong> means all laws and regulations applicable to Collab Code's processing of Personal Data under the Agreement, including but not limited to the General Data Protection Regulation (Regulation (EU) 2016/679) ("GDPR") and the California Consumer Privacy Act ("CCPA").
            </p>
            <p>
               <strong>"Customer Data"</strong> means any Personal Data that Collab Code processes on behalf of Customer as a Data Processor in the course of providing the Services.
            </p>

            <h2>2. Processing of Personal Data</h2>
            <p>
               Collab Code will only process Customer Data in accordance with Customer's documented instructions, unless processing is required by Applicable Data Protection Laws to which Collab Code is subject. Customer instructs Collab Code to process Customer Data to provide the Services and as further detailed in this DPA.
            </p>
            <p>
               Collab Code ensures that persons authorized to process the Personal Data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality.
            </p>

            <h2>3. Security Measures</h2>
            <p>
               Taking into account the state of the art, the costs of implementation and the nature, scope, context and purposes of processing as well as the risk of varying likelihood and severity for the rights and freedoms of natural persons, Collab Code shall implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including inter alia as appropriate:
            </p>
            <ul className="text-[#888] space-y-2 mt-4 mb-8 list-disc list-inside">
               <li>The pseudonymization and encryption of Personal Data;</li>
               <li>The ability to ensure the ongoing confidentiality, integrity, availability and resilience of processing systems and services;</li>
               <li>The ability to restore the availability and access to Personal Data in a timely manner in the event of a physical or technical incident;</li>
               <li>A process for regularly testing, assessing and evaluating the effectiveness of technical and organizational measures for ensuring the security of the processing.</li>
            </ul>

            <h2>4. Sub-processors</h2>
            <p>
               Customer acknowledges and agrees that Collab Code may engage third-party Sub-processors in connection with the provision of the Services. Collab Code will enter into a written agreement with each Sub-processor imposing data protection terms that require the Sub-processor to protect the Customer Data to the standard required by Applicable Data Protection Laws.
            </p>

            <h2>5. Data Subject Rights</h2>
            <p>
               Collab Code shall, to the extent legally permitted, promptly notify Customer if Collab Code receives a request from a Data Subject to exercise the Data Subject's right of access, right to rectification, restriction of Processing, erasure ("right to be forgotten"), data portability, object to the Processing, or its right not to be subject to an automated individual decision making.
            </p>

         </motion.article>

         {/* ───────────────── Footer Note ───────────────── */}
         <div className="mt-20 pt-8 border-t border-white/[0.1] text-sm text-[#888] font-mono">
            <p>For questions regarding this DPA or privacy practices, please contact <a href="mailto:privacy@collabcode.dev" className="text-white hover:underline underline-offset-4">privacy@collabcode.dev</a>.</p>
         </div>
      </div>
    </main>
  );
}
