
import Head from 'next/head'
import Link from 'next/link'
import 'antd/dist/antd.css';
import GitHubButton from 'react-github-btn'
import { InstagramOutlined, LinkedinOutlined, GoogleOutlined } from '@ant-design/icons'

import styles from '../styles/Home.module.css'
import { Badge, List, Typography, Divider, Button } from 'antd';
const qaEn = [
  {
    question: 'What on earth is this?',
    answer: 'This is a human-friendly version of Interface3 schedule. It allows to filter the schedule and shows you the information you select. For example, select a professor and you can see all the courses he or she gives.'
  },
  {
    question: 'I see a blue icon next to column title. What does it mean?',
    answer: 'This blue icon means that a filter is active, so you see selected entries according to your selection criteria (checkbox you clicked). To undo this, click reset in a dropdown menu.'
  },
  {
    question: 'I want to see more into the future, and sometimes to take a look into the past.',
    answer: (
    <span>
        {"Since this app is dumb, it can only present information that it sees "}
        <a href="https://interface3.odoo.com/horaire-tv/aaaa-bbbb-cccc-dddd-eeee">{"here"}</a>{". Difference between the two is only in presentation. In particular, I changed date format for readability, column order for mobile accessibility, and extrapolated dates and course names to make the table filterable."}
    </span>
    )
  },
  {
    question: 'I see "No data".',
    answer: "Probably, there are no entries for your selection. For example, if you selected a program and a professor who doesn't give courses to the students of this program."
  },
  {
    question: 'This is not mobile-friendly. Like, at all!',
    answer: "True. I'm thinking on making it mobile-friendly in a smarter way. So far I resorted to horizontal scroll and switched columns a bit to fit the most important ones to smaller screens, but it's still a long way to go."
  },
  {
    question: 'Column sizes change if I click next page.',
    answer: "You spot a nice one! Since sizes of columns adapt to the content of a given page, I'd recommend you to select more entries per page (lower right corner of the table). This way you can calmly observe your selected entries without needing to change pages too often."
  },
  {
    question: "The headers are weird. Date: AM, it just doesn't make any sense!",
    answer: "Indeed! I just formatted the presentation a bit, while leaving most of the data from the original table completely unchanged. Added is only what was needed for performing filtering and sorting: extrapolated values for dates and educational program (Jour and Formation columns)."
  },
  {
    question: "Actually, the idea is nice... But I don't like several things.",
    answer: (
    <span>
        { "Your feedback is golden, please share your thoughts by clicking the `Issue` button. I placed it here again just in case. Let's collect all these unfixed insects."}
        <br />
        <GitHubButton 
            href="https://github.com/yanina-nas/gurlz-horaire/issues" 
            data-icon="octicon-issue-opened" 
            data-size="large" 
            aria-label="Issue yanina-nas/gurlz-horaire on GitHub"
        >
          {"Issue"}
        </GitHubButton>
    </span>
    )
  },
  {
    question: 'How does it work?',
    answer: (
        <span>
            {"This app goes to "}
            <a href="https://interface3.odoo.com/horaire-tv/aaaa-bbbb-cccc-dddd-eeee">{"this website"}</a>
            {", takes it as plain text, operates on that text string with glue and scissors, and presents it a tiny bit friendlier."}
        </span>
    )
  },
  {
    question: 'Why!?',
    answer: "I used to look up the schedule from screenshots attached to Nicole's emails to all students. But this time, after end-of-may examination there were no screenshots for June. So I took a look at our odoo page and got sad. It took a little work and voila, checking the schedule is not painful anymore. And I hope that it is true for some of you, too!"
  },
];


const Faq = () => {
    return (
    <div className={styles.container}>
        <Head>
            <title>Interface3 horaire</title>
            <meta name="FAQ" content="Interface3 schedule aka GURLZ horaire" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
        <Badge count={10}>
            <h1 className={styles.title}>FAQ</h1>
        </Badge>
        <Link href="/">
            {"Go back"}
        </Link>
        <Divider orientation="left">{qaEn[0].question}</Divider>
        <List
            bordered
            dataSource={qaEn}
            renderItem={qaEn => (
                <List.Item>
                <Typography.Text mark>{qaEn.question}</Typography.Text> {qaEn.answer}
                </List.Item>
            )}
        />
      </main>
      <a href="mailto:plainwhiteyoghurt@gmail.com">
        <Button  icon={<GoogleOutlined />} size={"large"} />
      </a>
      <a href="https://www.linkedin.com/in/nastya-yanina/">
        <Button  icon={<LinkedinOutlined />} size={"large"} />
      </a>
        <a href="https://www.instagram.com/yanina_nas/">
        <Button  icon={<InstagramOutlined />} size={"large"} />
        </a>
      <footer className={styles.footer}>
        <code>
          {`< `}Made with love {` />`}
        </code>
        
      </footer>
    </div>
)}

export default Faq