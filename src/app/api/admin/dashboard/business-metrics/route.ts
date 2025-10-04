import { NextResponse } from 'next/server'
import { getBusinessMetrics } from '@/features/overview/dashboard/services'
import { withAuth } from '@/lib/api-auth'
import { ENTITIES, ACTIONS } from '@/constants/permissions'
import type { BusinessMetricsResponse } from '@/features/overview/dashboard/types/dashboard.types'

/**
 * GET /api/dashboard/business-metrics
 * Get comprehensive business metrics including user growth, revenue, performance, and KPIs
 */
export const GET = withAuth(
	async (): Promise<NextResponse<BusinessMetricsResponse>> => {
		try {
			const response = await getBusinessMetrics()

			return NextResponse.json(response)
		} catch (error) {
			console.error('Error fetching business metrics:', error)

			const errorResponse: BusinessMetricsResponse = {
				success: false,
				data: {
					userMetrics: {
						totalUsers: 0,
						activeUsers: 0,
						userRetention: 0,
						monthlyGrowth: []
					},
					revenueMetrics: {
						totalRevenue: 0,
						monthlyRecurringRevenue: 0,
						averageRevenuePerUser: 0,
						monthlyData: []
					},
					performanceMetrics: {
						speed: 0,
						speedEfficiency: 0,
						speedQuality: 0,
						reliability: 0,
						reliabilityEfficiency: 0,
						reliabilityQuality: 0,
						security: 0,
						securityEfficiency: 0,
						securityQuality: 0,
						usability: 0,
						usabilityEfficiency: 0,
						usabilityQuality: 0,
						scalability: 0,
						scalabilityEfficiency: 0,
						scalabilityQuality: 0,
						efficiency: 0,
						efficiencyEfficiency: 0,
						efficiencyQuality: 0
					},
					systemMetrics: {
						uptime: 0,
						responseTime: 0,
						errorRate: 0,
						throughput: 0
					},
					businessKPIs: {
						conversionRate: 0,
						customerSatisfaction: 0,
						churnRate: 0,
						lifetimeValue: 0
					}
				},
				message: error instanceof Error ? error.message : 'Failed to fetch business metrics',
				timestamp: new Date()
			}

			return NextResponse.json(errorResponse, { status: 500 })
		}
	},
	{ entity: ENTITIES.DASHBOARD, action: ACTIONS.READ }
)
