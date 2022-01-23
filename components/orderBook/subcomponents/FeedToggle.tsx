import { memo } from 'react';
import { Button } from 'react-bootstrap';
import styles from '../OrderBook.module.scss'

const FeedToggle = ({ handleFeedToggle }) => <Button
    id="toggleFeed"
    name="toggleFeed"
    className={styles.toggleButton}
    onClick={handleFeedToggle}
    size="sm"
>
    Toggle Feed
</Button>;

export default memo(FeedToggle);