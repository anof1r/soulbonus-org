import React from 'react'
import {
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	StatGroup,
} from '@chakra-ui/react'

export default function SingleMonthlyStatistics({ statistic }) {
	return (
		<div>
			<StatGroup>
				<Stat>
					<StatLabel fontSize='1em'>{statistic.Name}</StatLabel>
					<StatNumber color='purple.800'>{statistic.Count}</StatNumber>
					<StatHelpText>
						<StatArrow type={statistic.Persent >= 0 ? 'increase' : 'decrease'} />
						{Math.abs(statistic.Persent)}
					</StatHelpText>
				</Stat>
			</StatGroup>
		</div>
	)

}
