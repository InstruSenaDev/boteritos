import {
    Card,
    CategoryBar,
    DeltaBar,
    MarkerBar,
    ProgressBar,
} from '@tremor/react';

export const ProgressBarD = () => (
    <div className="flex justify-center">
        <Card className="w-full">
            <ProgressBar value={72} />
        </Card>
    </div>
);